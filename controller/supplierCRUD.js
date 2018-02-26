'use strict'

class SupplierCRUD {

  static supplierPage(req,res){
    res.send('supplier page')
  }

  static supplierAddPage(req,res){
    res.send('supplier add')
  }

  static supplierEditPage(req,res){
    res.send('supplier edit')
  }

  static supplierDeletePage(req,res){
    res.send('supplier delete')
  }

}

module.exports = SupplierCRUD;
