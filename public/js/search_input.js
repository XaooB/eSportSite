//TEMPORARY SCRIPT
var myObject = (function () {
    var searchInput = document.querySelector('.searchEngine #search');

    var toggleInput = () => {
        searchInput.classList.toggle('showingSearchEngine');
    };

    var bindEvents = () => {
        document.querySelector('.searchEngine #searchButton').addEventListener('click', toggleInput, false);
    }

    var init = () => {
        bindEvents();
    }

    return {
        init: init
    }
}());

myObject.init();
