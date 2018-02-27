const router = require('express').Router();
const models = require('../models');

router.get('/', (req,res) => {
    models.Item.findAll({
        include:[
            {model: models.SupplierItem},
            {model: models.Supplier}
        ],
        order:[['name','ASC']]
    }).then(items => {
        // res.send(items);
            res.render('./item/item',{
                items:items
            });
        });
});

router.get('/add', (req, res) => {
    let err = req.query.err;
    res.render('./item/item-add',{err:err});
});

router.post('/add', (req, res) => {
    models.Item.create({
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(() => {
        res.redirect('/items');
    }).catch((err) => {
        res.redirect('/items/add?err='+err.message);
    });
});

router.get('/edit/:id', (req,res) => {
    models.Item.findById(req.params.id)
        .then(item => {
            res.render('./item/item-edit',{
                item:item
            });
        })
});

router.post('/edit/:id', (req,res) => {
    models.Item.update({
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem,
    },{
        where:{
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/items');
    })
});

router.get('/delete/:id', (req,res) => {
    models.Item.destroy({
        where: {
            id: req.params.id
        }}).then(() => {
            res.redirect('/items');
        });
});


module.exports = router;
