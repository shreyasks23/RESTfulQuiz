var express = require('C:\\Users\\shreyas.ks\\AppData\\Roaming\\npm\\node_modules\\express');
var bodyParser = require('C:\\Users\\shreyas.ks\\AppData\\Roaming\\npm\\node_modules\\body-parser');
var multer = require('multer');
var upload = multer();
var url = require('url');
var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var app = express();

app.use(bodyParser.json()); 

app.use(upload.array());
app.use(express.static(__dirname + 'public'));


app.get('/Login', function (req, res) {
    fs.readFile(__dirname + "/" + "Login.html", 'utf8', function (err, data) {
        res.end(data);
    });
})


app.post('/LoginServicePost', urlencodedParser , function (req, res) {
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
    fs.readFile(__dirname + "/" + "QuestionService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/StudentResponseService', function (req, res) {
    fs.readFile(__dirname + "/" + "StudentResponseService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/TestService', function (req, res) {
    fs.readFile(__dirname + "/" + "TestService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/BookmarkService', function (req, res) {
    fs.readFile(__dirname + "/" + "BookmarkService.js", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/LoadQuiz', function (req, res) {
    fs.readFile(__dirname + "/" + "LoadQuiz.js", 'utf8', function (err, data) {
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