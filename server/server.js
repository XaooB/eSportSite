const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public')); //sciezka do plikow statycznych

app.get('/', (req, res) => {
    res.render('home', {
        main_news: {
            title: 'VIRTUS.PRO WYGRYWA PGL MAJOR W KRAKOWIE!',
            img: '../assets/img/news/vp_winning.jpg'
        },
        mid_news: {
            first: {
                title: 'LOL: MISTRZOSTWA ŚWIATA 2017, DZIEŃ 1',
                img: '../assets/img/news/lol_championships.jpg'
            },
            second: {
                title: 'LOL: MISTRZOSTWA ŚWIATA 2017, DZIEŃ 2',
                img: '../assets/img/news/lol_championships.jpg'
            }
        },
        small_news: {
            first: {
                title: 'VIRTUS.PRO TAKE DOWN FNATIC IN KRAKÓW',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                img: '../assets/img/news/taz.jpg'
            },
            second: {
                title: 'VIRTUS.PRO TAKE DOWN FNATIC IN KRAKÓW',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                img: '../assets/img/news/taz.jpg'
            },
            third: {
                title: 'VIRTUS.PRO TAKE DOWN FNATIC IN KRAKÓW',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                img: '../assets/img/news/taz.jpg'
            }
        }
    });
})

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});
