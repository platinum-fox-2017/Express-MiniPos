"use strict"
const SupplierCRUD = require('./supplierCRUD.js')
const ItemCRUD = require('./itemCRUD.js')

class Controller {

  static home(req, res){
    res.send('homepage')
  }

}

module.exports = {
  Controller: Controller,
  SupplierCRUD: SupplierCRUD,
  ItemCRUD: ItemCRUD
};
