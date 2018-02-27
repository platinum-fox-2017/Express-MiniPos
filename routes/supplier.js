const router = require('express').Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req,res) => {
    models.Supplier.findAll({
        include:[
            {model: models.Item},
            {model: models.SupplierItem}
        ],
        order:[['name','ASC']]
    }).then(suppliers => {
        // res.send(suppliers)
            res.render('./supplier/supplier',{
                suppliers:suppliers
            });
        });
});

router.get('/add', (req, res) => {
    res.render('./supplier/supplier-add');
});

router.post('/add', (req, res) => {
    models.Supplier.create({
        name: req.body.name,
        kota: req.body.kota,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(() => {
        res.redirect('/suppliers');
    });
});

router.get('/edit/:id', (req,res) => {
    models.Supplier.findById(req.params.id)
        .then(supplier => {
            res.render('./supplier/supplier-edit',{
                supplier:supplier
            });
        })
});

router.post('/edit/:id', (req,res) => {
    models.Supplier.update({
        name:req.body.name,
        kota:req.body.kota,
    },{
        where:{
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/suppliers');
    })
});

router.get('/delete/:id', (req,res) => {
    models.Supplier.destroy({
        where: {
            id: req.params.id
        }}).then(() => {
            res.redirect('/suppliers');
        });
});

router.get('/:id/additem', (req,res) => {
    models.Supplier.findAll({
        where: {
            id:req.params.id
        },
        include:[
            {model: models.Item},
            {model: models.SupplierItem}
        ],
    }).then(supplier => {
        console.log(supplier[0].Items.map(x => x.id));
        models.Item.findAll({
            where:{
                id: {
                    [Op.notIn]: supplier[0].Items.map(x => x.id)
                }
            }
        }).then(items => {
                // res.send(items);
                res.render('./supplier/supplier-add-item', {
                    items: items,
                    supplier: supplier[0]
                });
            })
        });
})

router.post('/:id/additem', (req,res) => {
    models.SupplierItem.create({
        SupplierId: req.params.id,
        ItemId: req.body.ItemId,
        price: req.body.price,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(() => {
        res.redirect('/suppliers');
    })
})


module.exports = router;
