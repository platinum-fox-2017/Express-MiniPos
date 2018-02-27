'use strict'
const db = require('../models/index.js')
const express = require('express')

class ItemCRUD {

  static itemPage(req,res){
    db.Item.findAll({
      include: [
        {
          model: db.Supplier
        }
      ]
    }).then(foundItems => {
      // res.send(foundItems)
      res.render('./item/item.ejs', {
        title:'Item Page',
        header:'Items',
        foundItems:foundItems,
        err: null
      })
    })
  }


  static itemAddPage(req,res){

    // res.send('item add')
    res.render('./item/itemAddForm.ejs', {
      title:'Adding Item',
      header:'Add Item',
      itemData:{
        name: '',
        brand: '',
        codeitem: ''
      },
      err: null
    })
  }

  static itemAddPagePost(req,res){
    db.Item.create({
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(newItem=>{
      res.redirect('/items')
    }).catch(err=>{
      res.render('./item/itemAddForm.ejs', {
        title:'Adding Item',
        header:'Add Item',
        itemData: {
          name: req.body.name,
          brand: req.body.brand,
          codeitem: req.body.codeitem
        },
        err: err
      })
    })

  }

  static itemEditPage(req,res){
    let itemId = req.params.id
    db.Item.findById(itemId).then(foundItem => {
      // res.send('item edit')
      res.render('./item/itemEditForm.ejs', {
        title:'Editing Item Data',
        header:'Editing Item',
        itemId: itemId,
        foundItem: foundItem,
        err: null
      })
    })

  }

  static itemEditPagePost(req,res){
    let itemId = req.params.id
    db.Item.update(
      {
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem,
        updatedAt: new Date()
      },
      {
        where:{
          id:req.params.id
        }
      }
    ).then(updatedItem=>{
      // res.send('item edit')
      res.redirect('/items')
    }).catch(err=>{
      res.render('./item/itemEditForm.ejs', {
        title:'Editing Item Data',
        header:'Editing Item',
        itemId : itemId,
        foundItem: {
          name: req.body.name,
          brand: req.body.brand,
          codeitem: req.body.codeitem
        },
        err: err
      })
    })

  }

  static itemDeletePage(req,res){
    db.Item.destroy(
      {
        where: {
          id:req.params.id
        }
      }
    ).then(()=>{
      res.redirect('/items')
    }).catch(err=>{
      console.log('---delete---'+err);
    })
    // res.send('item delete')
  }

}

module.exports = ItemCRUD;
