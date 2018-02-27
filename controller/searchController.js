'use strict'
const db = require('../models/index.js')
const express = require('express')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SearchController {


  static searchPage(req, res){

    res.render('./searchPage.ejs', {
      title:'Search',
      header:'Search Page',
      foundSupplierItems: [],
      searched: false,
      err: null
    })
  }

  static searchPageResult(req, res){
    let itemName = req.body.itemName
    let minPrice = req.body.minPrice
    let maxPrice = req.body.maxPrice

    db.SupplierItem.findAll({
      where:{
        price: {[Op.between]: [minPrice, maxPrice]}
      },
      include:[
        { model:db.Supplier },
        {
          model:db.Item,
          where: {
            name: {[Op.iLike]: `%${itemName}%`}
          }
        }
      ]
    }).then(foundSupplierItems=>{
      // res.send(foundSupplierItems)
      res.render('./searchPage.ejs', {
        title:'Search',
        header:'Search Page',
        foundSupplierItems:foundSupplierItems,
        searched: true,
        err: null
      })
    })

  }

}

module.exports = SearchController;
