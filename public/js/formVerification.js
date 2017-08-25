var myObject = (()=> {
    let passowrd = document.querySelector('#registerForm #password'),
        confirmPassword = document.querySelector('#registerForm #confirm_password');
    
    let validate = () => {
        if(password.value !== confirmPassword.value) confirmPassword.setCustomValidity('Hasła nie pasują do siebie!')
    }
    
    passowrd.onchage = validate;
    confirmPassword.onkeyup = validate;
})();

