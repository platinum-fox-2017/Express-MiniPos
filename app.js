'use strict'

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const routes        = require('./routes');
const PORT          = 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.locals.helper   = require('./helpers')
app.use('/',routes);

app.listen(PORT,() => {
    console.log('Your application is running on port ' + PORT);
})