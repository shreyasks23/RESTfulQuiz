var express = require('C:\\Users\\shreyas.ks\\AppData\\Roaming\\npm\\node_modules\\express');
var bodyParser = require('C:\\Users\\shreyas.ks\\AppData\\Roaming\\npm\\node_modules\\body-parser');


var url = require('url');
var fs = require("fs");
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

var jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/')));


app.get('/Login', function (req, res) {
    fs.readFile(__dirname + "/" + "Login.html", 'utf8', function (err, data) {
        res.end(data);
    });
})


app.post('/LoginServicePost', jsonParser , function (req, res) {
    // Prepare output in JSON format  
    
        var username =  req.body.username;
        var password =  req.body.password;         

    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var Users = JSON.parse(data);    
        var UserFound = false;
        Users.forEach(element => {
            if (element.name == username && element.password == password) {
                UserFound = true;
            }
        });

        if (UserFound) {
            console.log("user found");
            res.end("found");
        }
        else {
            console.log("user not found");
            res.end("notfound");
        }
    });  
    
})

app.get('/LoginService', function (req, res) {

    var un = req.query.username;
    var pass = req.query.password;
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var Users = JSON.parse(data);
        var UserFound = false;
        Users.forEach(element => {
            if (element.name == un && element.password == pass) {
                UserFound = true;
            }
        });
        if (UserFound) {
            console.log("user found");
            res.end("found");
            
        }
        else {
            console.log("user not found");
            res.end("notfound");
        }

    });
})

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/QuizScreen', function (req, res) {
    fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/QuestionService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "QuestionService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/StudentResponseService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "StudentResponseService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/TestService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "TestService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/BookmarkService', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "BookmarkService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/LoadQuiz', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "LoadQuiz.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/MasterQuestions.txt', function (req, res) {
    fs.readFile(__dirname + "/" + "MasterQuestions.txt", 'utf8', function (err, data) {
        res.end(data);
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})