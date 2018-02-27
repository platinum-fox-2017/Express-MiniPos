'use strict';

module.exports = app => {
	app.get('/', (req, res) => res.status(200).render('./pages/index.ejs', {
		message: 'Mini Point Of Sales',
	}));

	app.use('/suppliers', require('./supplier'));
	app.use('/items', require('./item'));
	app.use('/search', require('./search'));
};