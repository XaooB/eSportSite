function validateForm(e) {
  e.preventDefault();

  let password = document.querySelector("form #password"),
    confirmPassword = document.querySelector("form #confirm-password"),
    form = document.querySelector("form");

  function validate() {
    if (password.value !== confirmPassword.value) {
      console.log("prawda");

      confirmPassword.setCustomValidity("Hasła nie pasują do siebie!");
    } else {
      form.submit();
    }
  }

  validate();
}
