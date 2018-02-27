const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models')

router.get('/', (request, response) => {
    models.Supplier.findAll({
        include: [{
            model: models.SupplierItem
        }, {
            model: models.Item
        }]
    }).then(projects => {
        let obj= {
            title: 'List Suppliers',
            arrSuppliers: projects
        }
        // response.send(obj);
        response.render('show_supplier.ejs', obj); // return array of objects supplier
    })
});



router.get('/add', (request, response) => {
    let obj = {
        title: 'Add Suppliers Data'
    };
    response.render('add_supplier.ejs', obj); // return array of objects supplier
});

router.post('/add', (request,response) => {
    var obj = request.body;
    // console.log(obj);
    models.Supplier.create({ Name: obj.Name, Kota: obj.Kota })
        .then(() => models.Supplier.findOrCreate({where: {Name: obj.Name}, defaults: {}}))
        .spread((Supplier, created) => {
            console.log(Supplier.get({plain: true}))
            console.log(created)
        response.redirect('/suppliers');
    })
});

router.get('/edit/:id', (request, response) => {
    let obj = {
        title: 'Edit Suppliers Data'
    };
    response.render('edit_supplier.ejs', obj);
});

router.post('/edit/:id', (request, response) => {
    let obj = request.body;
    let id = request.params.id;
    // response.send(obj);
    models.Supplier.update(obj, {where: {id: id}})
    .then(() => {
        console.log(obj);
        response.redirect('/suppliers');
    })
});

router.get('/delete/:id', (request,response) => {
    let id = request.params.id;
    models.Supplier.destroy({where: {id: id}})
        .then(() => {  
            console.log(`Successfully deleted ID ${id}`);
        })
    response.redirect('/suppliers');
});

router.get('/:id/additem', (request,response) => {
    let id = request.params.id;
    models.Supplier.findAll({
        include: [{
            model: models.SupplierItem
        }, {
            model: models.Item
        }],
        where: {
            id: id
        }
    }).then(projects => {
        models.Item.findAll({}).then(listItem => {
            let stockItemsId = [];
            for (let i = 0; i < projects[0].SupplierItems.length; i++) {
                stockItemsId.push(projects[0].SupplierItems[i].ItemId)
            }
            
            let listItemsId = [];
            for (let i = 0; i < listItem.length; i++) {
                listItemsId.push(listItem[i].id);
            }

            for (let i = 0; i < stockItemsId.length; i++) {
                for (let j = 0; j < listItemsId.length; j++) {
                    if (stockItemsId[i] == listItemsId[j]) {
                        listItemsId.splice(j,1);
                    }
                }
            }


            let obj= {
                title: 'Add Item for Supplier',
                arrResultId: listItemsId,
                arrObjSuppliers: projects,
                arrObjItems: listItem
            }
            // response.send(obj);
            response.render('add_item_supplier.ejs', obj); // return array of objects supplier
        })
    })

});


router.post('/:id/additem', (request, response) => {
    let id = request.params.id;
    var obj = {
        SupplierId: id,
        ItemId: request.body.ItemId,
        Price: request.body.Price
    }
    // response.send(request.body);
    models.SupplierItem.create(obj)
        .then(() => {
            response.redirect('/suppliers')
        })
});




module.exports = router;
