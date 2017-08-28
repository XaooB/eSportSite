var myObject = (()=> {
    let password = document.querySelector('#registerForm #password'),
        confirmPassword = document.querySelector('#registerForm #confirm_password');
    
    let validate = () => {
        console.log(password.value + '/' + confirmPassword.value)
        if(password.value !== confirmPassword.value) confirmPassword.setCustomValidity('Hasła nie pasują do siebie!')
    }
    
    password.onchage = validate;
    confirmPassword.onkeyup = validate;
})();

