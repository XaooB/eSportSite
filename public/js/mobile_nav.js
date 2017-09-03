var Menu = (() => {
    let showButton = document.querySelector('.navbar .hamburger'),
        hideButton = document.querySelector('.navbar .exit'),
        mobileNav = document.querySelector('.navbar .mobile_nav');

    showButton.addEventListener('click', () => {
        mobileNav.style.display='block';
        showButton.style.display='none';
        hideButton.style.display='block';
    });

    hideButton.addEventListener('click', () => {
        mobileNav.style.display='none';
        hideButton.style.display='none';
        showButton.style.display='block';
    });
})();
