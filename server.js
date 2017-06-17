var express = require("express"),
    app = express(),
    mongo = require("mongojs");


app.get("/", (req, res) => res.send({
    error: false,
    message: "Please check the API docs at https://github.com/cocktinder/api"
}));

app.get("/write", (req, res) => {
    mongo(process.env.MONGO_URL).cocktails.save(require("./cocktails.js"), data => res.send(data));
});



app.listen(process.env.PORT || 5000, () => console.log("Online at :" + process.env.PORT || 5000));
