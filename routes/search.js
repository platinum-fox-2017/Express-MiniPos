const router = require('express').Router();
const models = require('../models');
const sequelize = require('sequelize');
const op = sequelize.Op;

router.get('/', (req, res) => {
    if(req.query.name!="" && req.query.min!="" && req.query.max!=""){
        models.SupplierItem.findAll({
            include:[
                {model: models.Supplier},
                {model: models.Item,
                    where: {
                        name:{
                            [op.iLike]: '%'+req.query.name+'%'
                        }
                    }
                }
            ],
            where:{
                price:{
                    [op.between]: [req.query.min, req.query.max]
                }
            }

        }).then(supplieritem => {
            // res.send(supplieritem)
            res.render('./search/search',{supplieritem:supplieritem});
        })
    }
    else{
        res.render('./search/search',{supplieritem:[]});
    }
});

router.post('/', (req, res) => {
    res.redirect(`/search?name=${req.body.ItemName}&min=${req.body.MinPrice}&max=${req.body.MaxPrice}`);
});


module.exports = router;
