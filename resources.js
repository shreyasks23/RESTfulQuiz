var express = require('express');
var fs = require("fs");

var router = express.Router();

router.get('/MasterQuestions', function (req, res) {
    fs.readFile(__dirname + "/public" + "/MasterQuestions.txt", 'utf8', function (err, data) {
        res.end(data);
    });
})

module.exports = router;