var BookmarkService = (function () {
    var bookmarkArray = [];
    function setBookmarkFunc(questionId) {

        
        if (bookmarkArray[questionId] == false || bookmarkArray[questionId] == null || bookmarkArray[questionId] == undefined) {
            bookmarkArray[questionId] = true;            
        }
        else {
            alert("bookmark added already");            
        }
    }

    function getAllBookmarksFunc() {
        return bookmarkArray;
    }

    function unBookmarkFunc(questionId) {
        bookmarkArray[questionId] = false;
    }

    var returnObj = {
        setBookmark: setBookmarkFunc,
        getAllBookmarks: getAllBookmarksFunc,
        unBookmark: unBookmarkFunc
    };

    return returnObj;
})();