"use strict"
const SupplierCRUD = require('./supplierCRUD.js')
const ItemCRUD = require('./itemCRUD.js')
const SearchController = require('./searchController.js')

class Controller {

  static home(req, res){
    // res.send('homepage')
    res.render('home.ejs', {
      title: 'Homepage',
      header: 'Welcome to mini-POS'
    })
  }

}

module.exports = {
  Controller: Controller,
  SupplierCRUD: SupplierCRUD,
  ItemCRUD: ItemCRUD,
  SearchController:SearchController
};
