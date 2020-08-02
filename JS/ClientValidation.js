function SectionButtonHighlight(obj){
    var btns = document.getElementsByClassName('SectionButton');
    for(var i = 0 ; i < btns.length ; i++)
    {
        btns[i].style.backgroundColor = "darkkhaki";
    }

    obj.style.backgroundColor = "#ba533a";

}


function ValidateUser() {

    //HTML elements
    var QuizDiv = document.getElementById('QuizDiv');
    var loginDiv = document.getElementById('loginDiv');
    var DispProPic = document.getElementById('DispProPic');
    var DispUserId = document.getElementById('DispUserId');


    //user object
    var un = document.getElementById('name').value;
    var ps = document.getElementById('pass').value;
    var obj = { "username": un, "password": ps };

    //ajax request to determine user exists
    var requestObj = new XMLHttpRequest();
    requestObj.open("POST", '/LoginService', false);
    requestObj.setRequestHeader("Content-Type", "application/json");
    requestObj.send(JSON.stringify(obj));

    var response = requestObj.responseText;
    if(response == "notfound"){
        alert("user not found");
    }
    
    else if (response != null || response != undefined) {        
        var UserProfile = JSON.parse(response);
        QuizDiv.style.display = 'block';
        loginDiv.style.display = 'none';
        DispProPic.src = UserProfile.ProPicPath;
        DispUserId.innerHTML = UserProfile.name;

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
        var innerRequestObj = new XMLHttpRequest();
        innerRequestObj.open("POST", '/AddUser', false);

        var formData = new FormData(form);        
        innerRequestObj.send(formData);
        var innerResponse = innerRequestObj.responseText;
        console.log(innerResponse);
        if (innerResponse == "0") {
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
    var preview = document.getElementById("preview");
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {        
        preview.style.display = "block";
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
