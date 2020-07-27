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
    var obj = { "username" : un,"password": ps};
    
    //var formData = new FormData(loginForm);
    var requestObj = new XMLHttpRequest();
    requestObj.open("POST", '/LoginServicePost', false);
    requestObj.setRequestHeader("Content-Type","application/json");
    requestObj.send(JSON.stringify(obj));

    var response = requestObj.responseText;
    if (response == 'found') {
        QuizDiv.style.display = 'block';
        loginDiv.style.display = 'none';
    }
}

function AddUser(){
    var un = document.getElementById('name').value;
    var ps = document.getElementById('pass').value;
    var form = document.getElementById('RegisterForm');

    var obj = { "username" : un,"password": ps};
    
    var formData = new FormData(form);
    var requestObj = new XMLHttpRequest();
    requestObj.open("POST", '/AddUser', false);
    //requestObj.setRequestHeader("Content-Type","application/json");
    requestObj.send(formData);
    var response = requestObj.responseText;
    if(response == "1")
    {
        alert("user exists");
    } 
      
}
