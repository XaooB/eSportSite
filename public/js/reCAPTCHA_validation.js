function validate() {
    var captcha_response = grecaptcha.getResponse();
    if (captcha_response.length == 0 || grecaptcha != undefined) {
        // Captcha is not Passed
        return '  Please verify you are not a robot.';
    } else {
        $.get('/profil/register', {
            'response': captcha_response
        }, function (response) {
            if (response == undefined && response.responseCode == undefined && response.responseDesc == undefined && response.responseCode !== 0 && response.responseDesc !== 'Sucess') {
                return ' You are a robot.';
            }
            grecaptcha.reset();
        });
    }
}
