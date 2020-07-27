var express = require('C:\\Users\\shreyas\\AppData\\Roaming\\npm\\node_modules\\express');
var fs = require("fs");

var router = express.Router();

router.get('/MasterQuestions', function (req, res) {
    fs.readFile(__dirname + "/" + "MasterQuestions.txt", 'utf8', function (err, data) {
        res.end(data);
    });
})

module.exports = router;