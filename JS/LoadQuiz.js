function bodyLoad() {
    displaySections();
    var sectionArr = TestService.getAllSectionNames();
    navToSection(sectionArr[0]);
}

function navToSection(CurrentSection) {
    QuestionService.setCurrentSection(CurrentSection);
    myFunctionFirst();
}

function displaySections() {
    var sectionArr = TestService.getAllSectionNames();
    var sectionButtonStr = '';
    for (i = 0; i < sectionArr.length; i++) {
        sectionButtonStr += '<button class="btn navbar-btn" onclick="navToSection(\'' + sectionArr[i] + '\')">' + sectionArr[i] + '</button>';
    }
    document.getElementById("sectionDiv").innerHTML = sectionButtonStr;
}

function myFunctionFirst() {
    var qobj = QuestionService.FirstQuestion();
    displayQuesText(qobj);
}

function myFunctionPlus() {
    var qobj = QuestionService.NextQuestion();
    displayQuesText(qobj);
}

function myFunctionMinus() {
    var qobj = QuestionService.PreviousQuestion();
    displayQuesText(qobj);
}

function studentResponse(sr) {
    StudentResponseService.storeUserResponse(QuestionService.MasterQuestionID(), sr);
}

function displayQuesText(qobj) {

    var CurrentQues = QuestionService.GetCurrentQuestionID();
    var container = document.getElementById('container');

    if ((TestService.getTestMode()) == 1) {

        var text = "<h3 id='Question'> " + (CurrentQues + 1) + ". " + qobj.Question + "</h3>";
        text += "<input type='radio' id='rd1' name ='options' value= 1 onclick='studentResponse(1)'>" + "<span id='Opt1'> " + qobj.Option1 + " </span> <br><br> ";
        text += "<input type='radio' id='rd2' name ='options' value= 2 onclick='studentResponse(2)'>" + "<span id='Opt2'>" + qobj.Option2 + "</span><br><br> ";
        text += "<input type='radio' id='rd3' name ='options' value= 3 onclick='studentResponse(3)'>" + "<span id='Opt3'>" + qobj.Option3 + "</span> <br><br> ";
        text += "<input type='radio' id='rd4' name ='options' value= 4 onclick='studentResponse(4)'>" + "<span id='Opt4'>" + qobj.Option4 + "</span> <br><br> ";
        container.innerHTML = text;

        var stuResponse = StudentResponseService.getStoredResponse(QuestionService.MasterQuestionID());
        if (stuResponse != undefined) {
            document.getElementById("rd" + stuResponse).checked = true;
        }
    }
    else {
        DisplayQuestionsInReviewMode(qobj);
    }

}

function AddBookmark() {

    var MasterQues = QuestionService.MasterQuestionID();
    console.log(MasterQues);
    BookmarkService.setBookmark(MasterQues);
    displayBookmarks();

}

function removeBookmark() {
    BookmarkService.unBookmark(QuestionService.MasterQuestionID());
    displayBookmarks();
}

function navigateToBookmarkQues(MasterQuestionID) {
    displayQuesText(QuestionService.getQuestionObj(MasterQuestionID));
}

function displayBookmarks() {
    var bookmarkStr = '';
    for (var i = 0; i < BookmarkService.getAllBookmarks().length; i++) {
        if (BookmarkService.getAllBookmarks()[i] == true) {
            bookmarkStr += "<button class='btn btn-danger navbar-btn BtnNav' style='display: inline;' onclick='navigateToBookmarkQues(" + i + ")'>" + QuestionService.getQuestionObj(i).Section + " Q" + (i + 1) + "</button> \t";
        }
    }
    document.getElementById("BookmarkBtns").innerHTML = bookmarkStr;
}

function DisplayQuestionsInReviewMode(QuestionObj) {
    var CurrentQues = QuestionService.GetCurrentQuestionID();
    var container = document.getElementById('container');
    var span = document.createElement('span');
    var correct_opt = QuestionObj.CorrectAnswer;

    span.setAttribute('id', 'spnCorrect');
    var tick1 = '';
    var tick2 = '';
    var tick3 = '';
    var tick4 = '';

    if (correct_opt == 1) {
        tick1 = "&#10004;";
        span.innerHTML = tick1;
        container.insertBefore(span, container.childNodes[0]);
    }
    else if (correct_opt == 2) {
        tick2 = "&#10004;";
        span.innerHTML = tick2;
        container.insertBefore(span, container.childNodes[7]);
    }
    else if (correct_opt == 3) {
        tick3 = "&#10004;";
        span.innerHTML = tick3;
        container.insertBefore(span, container.childNodes[12]);
    }
    else if (correct_opt == 4) {
        tick4 = "&#10004;";
        span.innerHTML = tick4;
        container.insertBefore(span, container.childNodes[18]);
    }

    var text = "<h3 id='Question'> " + (CurrentQues + 1) + ". " + QuestionObj.Question + "</h3>";
    text += tick1 + "<input type='radio' id='rd1' name ='options' value= 1 onclick='studentResponse(1)'>" + "<span id='Opt1'> " + QuestionObj.Option1 + " </span> <br><br> ";
    text += tick2 + "<input type='radio' id='rd2' name ='options' value= 2 onclick='studentResponse(2)'>" + "<span id='Opt2'>" + QuestionObj.Option2 + "</span><br><br> ";
    text += tick3 + "<input type='radio' id='rd3' name ='options' value= 3 onclick='studentResponse(3)'>" + "<span id='Opt3'>" + QuestionObj.Option3 + "</span> <br><br> ";
    text += tick4 + "<input type='radio' id='rd4' name ='options' value= 4 onclick='studentResponse(4)'>" + "<span id='Opt4'>" + QuestionObj.Option4 + "</span> <br><br> ";
    container.innerHTML = text;

    document.getElementById('rd1').disabled = true;
    document.getElementById('rd2').disabled = true;
    document.getElementById('rd3').disabled = true;
    document.getElementById('rd4').disabled = true;

}