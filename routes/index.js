const express = require('express');
const app = express();
const router = express.Router();

router.get('/', function(request,response) {
    response.send(`Selamat datang di website Mini Pos !`)
})


router.use('/items', require('./items.js'));
router.use('/suppliers', require('./suppliers.js'));
router.use('/search', require('./search.js'));

module.exports = router;

