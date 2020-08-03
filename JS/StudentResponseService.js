var StudentResponseService = (function () {
    var studentResponseArray = [];

    function storeUserResponseFunc(questionId, response) {
        studentResponseArray[questionId] = response;
    }

    function getStoredResponseFunc(questionId) {
        return studentResponseArray[questionId];
    }
    var returnObj = {
        getStoredResponse: getStoredResponseFunc,
        storeUserResponse: storeUserResponseFunc
    };

    return returnObj;
})();
