//deprecated
function ValidateUser() {
    var un = document.getElementById('name').value;
    var ps = document.getElementById('pass').value;
    var QuizDiv = document.getElementById('QuizDiv');
    var loginDiv = document.getElementById('loginDiv');

    var requestObj = new XMLHttpRequest();
    var querystr = '/LoginService?username=' + un + '&password=' + ps;
    requestObj.open("GET", querystr, false);


    requestObj.send(querystr);
    var response = requestObj.responseText;
    if (response == 'found') {
        QuizDiv.style.display = 'block';
        loginDiv.style.display = 'none';
    }

}

function ValidateUserUsingPost() {

    var QuizDiv = document.getElementById('QuizDiv');
    var loginDiv = document.getElementById('loginDiv');
    var loginForm = document.getElementById('loginForm');
    var un = document.getElementById('name').value;
    var ps = document.getElementById('pass').value;
    var obj = { "username": un, "password": ps };

    var requestObj = new XMLHttpRequest();
    requestObj.open("POST", '/LoginServicePost', false);
    requestObj.setRequestHeader("Content-Type", "application/json");
    requestObj.send(JSON.stringify(obj));

    var response = requestObj.responseText;
    if (response == 'found') {
        QuizDiv.style.display = 'block';
        loginDiv.style.display = 'none';
    }
}

function AddUser() {
    var un = document.getElementById('username').value;
    var ps = document.getElementById('password').value;
    var form = document.getElementById('RegisterForm');

    var obj = { "username": un, "password": ps };

    var requestObj = new XMLHttpRequest();
    requestObj.open("POST", '/CheckUser', false);
    requestObj.setRequestHeader("Content-Type", "application/json");
    requestObj.send(JSON.stringify(obj));
    var response = requestObj.responseText;
    if (response == "1") {
        alert("user exists");
    }
    else {
        var requestObj = new XMLHttpRequest();
        requestObj.open("POST", '/AddUser', false);

        var formData = new FormData(form);
        //requestObj.setRequestHeader("Content-Type","application/json");
        requestObj.send(formData);
        var response = requestObj.responseText;
        if (response == "1") {
            alert("User created successfully");
            document.getElementById("RegisterDiv").style.display = "none";
            document.getElementById("loginDiv").style.display = "inline";
        }


    }

}

function displayRegister() {
    document.getElementById("RegisterDiv").style.display = "inline";
    document.getElementById("loginDiv").style.display = "none";

}

function previewFile() {
    const preview = document.getElementById("preview");
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.style.display = "inline";
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
