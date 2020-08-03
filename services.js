var express = require('express');
var fs = require("fs");

var router = express.Router();



router.get('/QuestionService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "QuestionService.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/StudentResponseService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "StudentResponseService.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/TestService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "TestService.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/BookmarkService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "BookmarkService.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/ValidationService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "ClientValidation.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/LoadQuiz', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "LoadQuiz.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

module.exports = router;