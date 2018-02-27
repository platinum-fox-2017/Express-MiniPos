'use strict';

const models = require('../models');
const sequelize = require('sequelize');

module.exports = {
	showSearchItem(req, res) {
		res.status(201).render(`./pages/search.ejs`, { name: req.query.name, min: req.query.min, max: req.query.max })
	},

	searchItem(req, res) {
		return models.SupplierItem
			.findAll({
                include: [{
                	model: models.Supplier
                }, { 
                	model: models.Item,
                	where: {
                		[sequelize.Op.or]: [{
                			name: {
                				[sequelize.Op.iLike]: `%${req.query.name}%`
                			}
                		}, {
                			brand: {
                				[sequelize.Op.iLike]: `%${req.query.name}%`
                			}
                		}]
                	}
                }],
                where: {
                	price: {
                		[sequelize.Op.between]: [req.query.min, req.query.max],
                	}
                }
            })
      		  .then(data => res.status(201).render(`./pages/search.ejs`, { data: data }))
       		  .catch(error => res.status(400).send(error.message));
    },
};