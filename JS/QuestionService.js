var QuestionService = (function () {
    var counter = 0;
    var MasterQuestion;
    var currentSection = '';
    var currentSectionQuestions = [];
    var currentSectionQuestionID = 0;
    MasterQuestion = [];

    var p = new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: "resources/MasterQuestions",
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            }
        })   
    })
   
    p.then((res) => {        
        MasterQuestion = JSON.parse(res);
        for (i = 0; i < MasterQuestion.length; i++) {
            MasterQuestion[i].MQIndex = i;
        }
    }).catch((err) => {
        console.log(err);
    })
    

    function setCurrentSectionFunc(Section) {
        currentSection = Section;
        currentSectionQuestions = MasterQuestion.filter(function (obj) {
            return obj.Section == Section;
        });
    }

    function NextQuestionFunc() {
        currentSectionQuestionID++;
        if (currentSectionQuestionID == currentSectionQuestions.length) {
            currentSectionQuestionID--;
        }
        return currentSectionQuestions[currentSectionQuestionID];
    }

    function PreviousQuestionFunc() {
        currentSectionQuestionID--;
        if (currentSectionQuestionID < 0) {
            currentSectionQuestionID = 0;
        }
        return currentSectionQuestions[currentSectionQuestionID];
    }

    function getQuestionID() {
        return currentSectionQuestionID;
    }

    function getMasterQuestionID() {
        return currentSectionQuestions[currentSectionQuestionID].MQIndex;
    }

    function getQuestionObjFunc(MasterQuestionID) {

        setCurrentSectionFunc(MasterQuestion[MasterQuestionID].Section);

        counter = MasterQuestionID;
        for (var i = 0; i < currentSectionQuestions.length; i++) {
            if (currentSectionQuestions[i].MQIndex == MasterQuestionID) {
                currentSectionQuestionID = i;
            }
        }
        return MasterQuestion[MasterQuestionID];
    }


    return {
        setCurrentSection: setCurrentSectionFunc,
        GetCurrentQuestionID: getQuestionID,
        MasterQuestionID: getMasterQuestionID,
        NextQuestion: NextQuestionFunc,
        PreviousQuestion: PreviousQuestionFunc,
        getQuestionObj: getQuestionObjFunc,
        FirstQuestion: function () {
            currentSectionQuestionID = 0;
            return currentSectionQuestions[currentSectionQuestionID];

        }
    };
})();