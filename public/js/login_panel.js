//TEMPORARY SCRIPT
var myObject = (function () {
    var loginPanel = document.querySelector('.login_wrapper .panel');

    var showPanel = () => {
        if (loginPanel.classList.contains('hidingPanel')) loginPanel.classList.remove('hidingPanel');
        loginPanel.classList.toggle('showingPanel');
    };

    var hidePanel = () => {
        loginPanel.classList.remove('showingPanel');
        loginPanel.classList.add('hidingPanel');
    }

    var bindEvents = () => {
        document.querySelector('.login_wrapper .login #loginButton').addEventListener('click', showPanel, false);
        document.querySelector('main').addEventListener('click', hidePanel, false);
        document.querySelector('.login_panel .exit').addEventListener('click', showPanel, false);
    }

    var init = () => {
        bindEvents();
    }

    return {
        init: init
    }
}());

myObject.init();
