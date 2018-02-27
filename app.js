const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

const port = 3000;

app.locals.helper = require('./helpers');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(express.static('public'));

app.use('/',routes);

app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});
