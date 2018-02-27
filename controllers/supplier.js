'use strict';

const models = require('../models');

module.exports = {
	showAll(req, res) {
		return models.Supplier
			.findAll({
                include : {
                    model: models.SupplierItem,
                    include: models.Item,
                }
            })
      		  .then(suppliers => res.status(201).render(`./pages/suppliers/list_supplier.ejs`, { status: req.query.status, message: req.query.message, data: suppliers }))
       		  .catch(error => res.status(400).send(error));
    },

    showAddForm(req ,res) {
    	res.status(201).render(`./pages/suppliers/add_supplier.ejs`, { status: req.query.status, message: req.query.message });
    },

    addData(req, res) {
    	return models.Supplier
    		.create({
    			name: req.body.name,
    			kota: req.body.kota,
    		})
    		  .then(supplier => res.status(201).redirect(`/suppliers/add?status=1&message=Data ${supplier.name} berhasil ditambahkan`))
    		  .catch(error => res.status(400).redirect(`/suppliers/add?status=0&message=${error.message}`));
    },

    showEditForm(req ,res) {
    	return models.Supplier
    		.findById(req.params.id)
    		  .then(supplier => res.status(201).render(`./pages/suppliers/edit_supplier.ejs`, { status: req.query.status, message: req.query.message, data: supplier }))
    		  .catch(error => res.status(400).send(error));
    },

    editData(req, res) {
    	return models.Supplier
    		.update({
    			name: req.body.name,
    			kota: req.body.kota,
    		}, {
    			where: { id: req.params.id }
    		})
    		  .then(() => res.status(201).redirect(`/suppliers/edit/${req.params.id}?status=1&message=Data ${req.body.name} berhasil diubah`))
    		  .catch(error => res.status(400).redirect(`/suppliers/edit/${req.params.id}?status=0&message=${error.message}`));
    },

    deleteData(req, res) {
        return models.Supplier
            .findById(req.params.id)
              .then(supplier => {
                supplier
                .destroy()
                  .then(() => res.status(201).redirect(`/suppliers`))
                  .catch(error => res.status(400).redirect(`/suppliers?status=0&message=${error.message}`));
              });
    },

    showAddItemForm(req, res) {
        return models.Supplier
            .findById(req.params.id, {
                include : {
                    model: models.SupplierItem,
                    include: models.Item,
                }
            })
              .then(supplier => {
                models.Item
                .findAll()
                 .then(item => res.status(201).render(`./pages/suppliers/add_item.ejs`, { status: req.query.status, message: req.query.message, data: supplier, dataItem: item }))
                 .catch(error => res.status(400).send(error));
            })
              .catch(error => res.status(400).send(error));
    },

    addItemSupplier(req, res) {
        return models.SupplierItem
            .create({
                SupplierId: req.params.id,
                ItemId: req.body.item,
                price: req.body.price,
            })
              .then(supplier => res.status(201).redirect(`/suppliers/${req.params.id}/additem`))
              .catch(error => res.status(400).send(error));
    },
};