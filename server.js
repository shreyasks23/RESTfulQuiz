var express = require('C:\\Users\\shreyas\\AppData\\Roaming\\npm\\node_modules\\express');
var bodyParser = require('C:\\Users\\shreyas\\AppData\\Roaming\\npm\\node_modules\\body-parser');

var fs = require("fs");
var path = require('path');
var services = require("./services.js");
var resources = require("./resources.js");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        var str = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, str)
    }
})



var upload = multer({ storage: storage  })


var app = express();

var jsonParser = bodyParser.json({ limit: '10mb', extended: true });

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(path.join(__dirname, '/')));
app.use('/services', services);
app.use('/resources', resources);

var type = upload.single('profilePic');


app.post('/AddUser', jsonParser, type , function (req, res) {    // Prepare output in JSON format  

    var username = req.body.username;
    var password = req.body.password;
    var obj = { "name": username, "password": password };

    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var Users = [];
        Users = JSON.parse(data);
        var UserFound = false;
        Users.forEach(element => {
            if (element.name == username) {
                UserFound = true;
            }
        });
        if (UserFound) {
            console.log("user found");
            res.end("1");
        }
        else {
            Users.push(obj);
            var jsonString = JSON.stringify(Users);
            fs.writeFile(__dirname + "/" + "users.json", jsonString, function (err) {
                if (err) throw err;
                console.log('created!');
                try {
                    res.send(req.file);
                } catch (err) {
                    res.send(400);
                }
                res.end("0");
            });

        }
    });

})


app.post('/LoginServicePost', jsonParser, function (req, res) {
    // Prepare output in JSON format  

    var username = req.body.username;
    var password = req.body.password;


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

app.get('/Register', function (req, res) {
    fs.readFile(__dirname + "/" + "Registration.html", 'utf8', function (err, data) {
        res.end(data);
    });
})

//#region deprecated methods
//deprecated
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

//#endregion

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})