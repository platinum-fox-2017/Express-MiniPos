const routes    = require('express').Router();
const suppliers = require('./suppliers');
const items     = require('./items');
const models    = require('../models');
const Op        = require('sequelize').Op;

routes.use('/suppliers',suppliers);
routes.use('/items',items);

routes.get('/search', (req,res) => {
    if(!req.query.name) {
        let supplierItem = []
        res.render('search-view', {supplierItem : supplierItem});
    } else {
        let name        = req.query.name;
        let minprice    = req.query.min;
        let maxprice    = req.query.max;
        // res.send(name + minprice + maxprice)
        models.SupplierItem.findAll({
            where : {
                // name : {[Op.like] : '%'+name+'%'},
                price: {[Op.between]: [minprice,maxprice]}
            },
            include : [
                {model : models.Item,
                    where: { name : {[Op.iLike] : '%'+name+'%'}}
                }, 
                {model : models.Supplier}]
        })
        .then(supplierItem =>{
            // res.send(supplierItem);
            res.render('search-view', {supplierItem : supplierItem});
        })
    }
})

routes.post('/search',(req,res)=>{
    res.redirect(`/search?name=${req.body.item_name}&min=${req.body.item_minprice}&max=${req.body.item_maxprice}`);
})

module.exports  = routes;
