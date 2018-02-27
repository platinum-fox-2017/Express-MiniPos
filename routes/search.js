const routes = require('express').Router()
const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

routes.get('/', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  if(Object.keys(req.query).length === 0) {
    res.render('search.ejs', {results: null})
  } else {
    let search = {
      name: req.query.name,
      min: req.query.min,
      max: req.query.max
    }
    Models.SupplierItem.findAll({
      include: [
        {model: Models.Supplier},
        {model: Models.Item,
          where: {
            name: {
              [Op.iLike]: `%${search.name}%`
            }
          }
        }
      ],
      where: {
        price:{ [Op.between]: [`${search.min}`, `${search.max}`]}
      }
    })
      .then((results) => {
        // res.send(results)
        res.render('search.ejs', {results: results})
      })
      .catch(err => {
        console.log(err)
      })
  }
})

routes.post('/', (req, res) => {
  let search = {
    name: req.body.name,
    min: req.body.min,
    max: req.body.max
  }
  res.redirect(`/search?name=${search.name}&min=${search.min}&max=${search.max}`)
})

module.exports = routes