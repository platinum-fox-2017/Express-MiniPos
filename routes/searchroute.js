const routesearch = require('express').Router();
const model = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routesearch.get('/',(req,res) => {
    res.render('searchpage')
})

routesearch.post('/',(req,res) => {
  model.supppplieritem.findAll({ include:[{
    model:model.item,
    where: {
        brand: {
            [Op.iLike]: `%${req.body.barang}%`
        }
      }},{
    model: model.supplier
      }],
        where: {
            price: {
                [Op.between]: [req.body.min, req.body.max]
            }
        }
      }).then(datas =>{
    res.render('searchtampil',{data:datas})
  })
})

module.exports = routesearch
