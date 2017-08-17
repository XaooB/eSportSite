const express = require('express')
const bcrypt = require('bcrypt');
const app = express();

app.get('/', (req, res) => {
    let password = '4f0EoHP8'
    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(password, salt).then((hash) => {
            console.log('Zahaszowane hasło: ' + hash);
            return bcrypt.compare(hash).then((result) => {
                if(result) {
                    console.log('Hasło jest prawidłowe!');
                } else {
                    console.log('Hasło jest nieprawidłowe!');
                }
            });
        });
    }).catch((err) => {
        console.log("Błąd podczas generowania salta: " + err.message);
    });
});

app.listen(3000);
