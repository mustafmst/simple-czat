const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        helpers: {
            foo: function() {
                console.log("FOO!");
            }
        }
    });
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});