'use strict'

class ItemCRUD {

  static itemPage(req,res){
    res.send('item page')
  }

  static itemAddPage(req,res){
    res.send('item add')
  }

  static itemEditPage(req,res){
    res.send('item edit')
  }

  static itemDeletePage(req,res){
    res.send('item delete')
  }

}

module.exports = ItemCRUD;
