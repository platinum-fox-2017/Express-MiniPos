const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.listen(port, () => {
    console.log(`Server is operating on port #${port}`)
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.locals.helpers = require('./helpers')

app.use('/', require('./routes'));


