var express = require("express"),
    app = express(),
    mongo = require("mongojs");


app.get("/", (req, res) => res.send({
    error: false,
    message: "Please check the API docs at https://github.com/cocktinder/api"
}));

app.listen(3000, () => console.log("Online at :3000"));