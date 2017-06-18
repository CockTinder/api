var express = require("express"),
    app = express(),
    mongo = require("mongojs"),
    passport = require("passport");


app.get("/", (req, res) => res.send({
    error: false,
    message: "Please check the API docs at https://github.com/cocktinder/api"
}));

app.get("/dump", (req, res) => mongo(process.env.MONGO_URL).cocktails.find((err, data) => {
    res.send(data);
}));

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const credentials = require("./credentials.js");

passport.use(new GoogleStrategy({
        clientID: credentials.google.id,
        clientSecret: credentials.google.secret,
        callbackURL: "https://mixme.one/home.php"
    },
    (accessToken, refreshToken, profile, cb) => {
        mongo(process.env.MONGO_URL).users.find({
            id: profile.id
        }, (err, data) => {
            if (!err && !data) {
                mongo(process.env.MONGO_URL).users.save(profile, (err, data) => {
                    return cb(err, data);
                });
            } else {
                return cb(err, data);
            }
        })
    }
));

app.get('/auth/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
  	'https://www.googleapis.com/auth/plus.profile.emails.read'
]}));

app.get( '/auth/google/callback',
	passport.authenticate( 'google', {
		successRedirect: '/auth/google/success',
		failureRedirect: '/auth/google/failure'
}));




app.listen(process.env.PORT || 5000, () => console.log("Online at :" + process.env.PORT || 5000));