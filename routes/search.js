const express = require('express')
const model = require('../models')
const bodyParser = require('body-parser')
const search = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

search.use(bodyParser.urlencoded({extended: false}))
search.use(bodyParser.json())


search.get('/', (req, res) => {
    if (Object.keys(req.query).length == 0){
        res.render('search.ejs', {data: null})
    } else {
        model.SupplierItem.findAll({
            include: [{
                model: model.Item,
                where: {
                    Name: {
                        [Op.iLike]: `%${req.query.Name}%`
                    }
                }
            },{
                model: model.Supplier
            }],
            where: {
                Price: {
                    [Op.between]: [req.query.MinPrice, req.query.MaxPrice]
                }
            }
        }).then((data) => {
            // res.send(data)
            res.render('search.ejs', {data: data})
        })
    }
})

search.post('/', (req, res) => {
    res.redirect(`/search?Name=${req.body.Name}&MinPrice=${req.body.MinPrice}&MaxPrice=${req.body.MaxPrice}`)
})

module.exports = search