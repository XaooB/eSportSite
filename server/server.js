const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public')); //sciezka do plikow statycznych

app.get('/', (req, res) => {
    res.render('home', {
        title:'VIRTUS.PRO WYGRYWA PGL MAJOR W KRAKOWIE',
        main_news: {
            title: 'VIRTUS.PRO WYGRYWA PGL MAJOR W KRAKOWIE!',
            img: '../assets/img/news/vp_winning.jpg'
        },
        mid_news: {
            first: {
                title: 'LOL: MISTRZOSTWA ŚWIATA 2017, DZIEŃ 1'
            },
            second: {
                title: 'TEC-9 dostaje nerfa!'
            },
            third: {
                title: 'Kiedy kolejna operacja? Czekamy Valve!'
            }
        },
        small_news: {
            first: {
                title: 'VIRTUS.PRO TAKE DOWN FNATIC IN KRAKÓW',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                img: '../assets/img/news/taz.jpg'
            }
        },
        lastest_news: {
            title: 'SKT T1 WYGRYWA MSI 2017!',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
            date: '02/08/2017, 20:29',
            img: '../assets/img/news/lol_championships.jpg'
        }
    });
});

app.get('/news/:category/:title', (req, res) => {
    res.render('news', {
        category: req.params.category,
        title: req.params.title.replace(/_/g, " "),
        text: '<p>Animi explicabo possimus, pariatur suscipit numquam quis sequi molestiae ratione atque eligendi, labore nemo dolorum delectus nam at culpa id doloremque aliquam ducimus. Voluptatum labore itaque aliquid rerum debitis blanditiis obcaecati odio ex unde vel provident, in fugiat, laudantium, amet nam. Obcaecati placeat vel eligendi, quos quod ratione repudiandae perspiciatis modi. Consequatur iste accusamus, odio, in, deserunt tempora facere placeat magnam aut exercitationem doloremque facilis iusto sequi pariatur beatae tempore earum necessitatibus porro, nihil.</p> <p>Assumenda pariatur illo voluptates nemo minus! Impedit natus unde corporis molestias qui laudantium veniam assumenda aut in adipisci, fuga, modi possimus quo obcaecati. Beatae quaerat exercitationem dolorum, nam repellendus quam sequi ipsa labore voluptatem enim aperiam modi porro iusto vel architecto quisquam saepe omnis, vitae sapiente nulla numquam officia et. Quidem, voluptas alias facere quas, dignissimos tempora tempore a doloribus et illum recusandae aliquid magnam dolore cupiditate voluptates minus nisi aperiam ut vel perferendis, ea magni assumenda nam. Ab magni cumque aspernatur libero, obcaecati cupiditate! Quia ratione beatae, eligendi sunt consectetur expedita repellat veritatis. Voluptatum ex ullam quas commodi, tempora officiis consequuntur adipisci veniam recusandae, doloremque voluptas asperiores at dignissimos esse, quo, necessitatibus impedit repudiandae! Dolores molestias officiis dolor eveniet quasi nam, quibusdam rerum id quo corporis tempore cumque excepturi cum enim hic reprehenderit. Ad ab minima cum quasi eius, cumque! Quia blanditiis nemo dolorem. Molestiae qui quia quibusdam iusto repellendus. Totam nesciunt modi earum doloribus ea ut quae debitis saepe, tenetur numquam, quo asperiores natus tempore provident consequuntur.</p><p> Repellat tempore tempora possimus sunt laborum fuga voluptatibus a molestiae temporibus laudantium repellendus, eos reiciendis eveniet, deserunt consequuntur inventore accusantium, explicabo vitae commodi laboriosam? Animi minus omnis officiis accusantium temporibus dolore eveniet ex nisi enim recusandae. <p>Provident fuga odit fugit natus rerum. Suscipit dicta error ex a neque, ab accusamus sint minima voluptates, laborum unde veritatis quisquam enim, tempora?</p>'
    });
});

app.listen(port, () => {
    console.log('Server running on localhost:3000');
});
