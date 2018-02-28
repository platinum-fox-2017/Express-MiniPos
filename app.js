const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const suppliers = require('./routes/suppliers');
const item = require('./routes/item')
const search = require('./routes/search')

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/suppliers', suppliers);
app.use('/items', item);
app.use('/search', search);

app.listen(3000, () => console.log(`The App listening on port 3000!`));