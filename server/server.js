const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public'));//sciezka do plikow statycznych


app.get('/', (req, res) => {
    res.render('home', {
        title: 'HOME'
    });
})

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});
