'use strict';

const models = require('../models');

module.exports = {
	showAll(req, res) {
		return models.Item
			.findAll({
                include : {
                    model: models.SupplierItem,
                    include: models.Supplier,
                }
            })
      		  .then(items => res.status(201).render(`./pages/items/list_item.ejs`, { status: req.query.status, message: req.query.message, data: items }))
       		  .catch(error => res.status(400).send(error));
    },

    showAddForm(req ,res) {
    	res.status(201).render(`./pages/items/add_item.ejs`, { status: req.query.status, message: req.query.message });
    },

    addData(req, res) {
    	return models.Item
    		.create({
    			name: req.body.name,
    			brand: req.body.brand,
    			codeitem: req.body.codeitem,
    		})
    		  .then(item => res.status(201).redirect(`/items/add?status=1&message=Data ${item.brand} ${item.name} berhasil ditambahkan`))
    		  .catch(error => res.status(400).redirect(`/items/add?status=0&message=${error.message}`));
    },

    showEditForm(req ,res) {
    	return models.Item
    		.findById(req.params.id)
    		  .then(item => res.status(201).render(`./pages/items/edit_item.ejs`, { status: req.query.status, message: req.query.message, data: item }))
    		  .catch(error => res.status(400).send(error));
    },

    editData(req, res) {
    	return models.Item
    		.update({
    			name: req.body.name,
    			brand: req.body.brand,
    			codeitem: req.body.codeitem,
    		}, {
    			where: { id: req.params.id }
    		})
    		  .then(item => res.status(201).redirect(`/items/edit/${req.params.id}?status=1&message=Data ${req.body.name} berhasil diubah`))
    		  .catch(error => res.status(400).redirect(`/items/edit/${req.params.id}?status=0&message=${error.message}`));
    },

    deleteData(req, res) {
        return models.Item
            .findById(req.params.id)
              .then(item => {
                item
                .destroy()
                  .then(item => res.status(201).redirect(`/items`))
                  .catch(error => res.status(400).redirect(`/items?status=0&message=${error.message}`));
              });
    },
};