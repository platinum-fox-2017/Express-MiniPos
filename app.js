'use strict'
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

//set EJS
app.set('view engine', 'ejs');

//SET Body Parser
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', require('./routes'));

app.listen(PORT, () => {
    console.log(`this connectioon : ${PORT}`);
});