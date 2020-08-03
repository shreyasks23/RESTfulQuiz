//Module imports
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require('path');
var multer = require('multer');

//js and questions services
var services = require("./services.js");
var resources = require("./resources.js");

//multer storage object initialization
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        var str = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, str);
    }
});

//multer instatiation
var uploader = multer({
    storage: storage
});


var app = express();

var jsonParser = bodyParser.json({
    extended: true
});

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
})); //restrict file size to upload

//serve static files in public folder(CSS and images)
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('public'));


app.use('/services', services);
app.use('/resources', resources);



app.get('/QuizScreen', function (req, res) {
    fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
        res.end(data);
    });
});


app.post('/CheckUser', jsonParser, function (req, res) {

    var username = req.body.username;

    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var Users = [];
        Users = JSON.parse(data);
        var UserFound = false;
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].name == username) {
                UserFound = true;
            }
            break;
        }
        if (UserFound) {
            console.log("user found");
            res.send("1");
        } else {
            console.log("user not found");
            res.send("0");
        }
    });
});


app.post('/AddUser', jsonParser, uploader.single('profilePic'), function (req, res) {
    // Prepare output in JSON format  

    var username = req.body.username;
    var password = req.body.password;
    var filename = encodeURI(req.file.path);
    var Users = [];

    var obj = {
        "name": username,
        "password": password,
        "ProPicPath": filename
    };

    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        Users = JSON.parse(data);

        Users.push(obj);
        var jsonString = JSON.stringify(Users);
        fs.writeFile(__dirname + "/" + "users.json", jsonString, function (err) {
            if (err) throw err;
            console.log('created!');
            res.end("0");
        });

    });
});

app.post('/LoginService', jsonParser, function (req, res) {

    var username = req.body.username;
    var password = req.body.password;


    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var Users = [];
        var UserProfile = {};
        Users = JSON.parse(data);
        var UserFound = false;

        for (var i = 0; i < Users.length; i++) {
            if (Users[i].name == username && Users[i].password == password) {
                UserFound = true;
                UserProfile = Users[i];
                break;
            }
        }

        if (UserFound) {
            console.log("user found");
            res.setHeader("Content-type", "application/json");
            res.write(JSON.stringify(UserProfile));
            res.end();
        } else {
            console.log("user not found");
            res.end("notfound");
        }
    });

});


//server initialization
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});