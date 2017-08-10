//TEMPORARY SCRIPT
var myObject = (function () {
    var loginPanel = document.querySelector('.login_wrapper .panel');

    var showPanel = () => {
        if (loginPanel.classList.contains('hiding')) loginPanel.classList.remove('hiding');
        loginPanel.classList.toggle('showing');
    };

    var hidePanel = () => {
        loginPanel.classList.remove('showing');
        loginPanel.classList.add('hiding');
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
