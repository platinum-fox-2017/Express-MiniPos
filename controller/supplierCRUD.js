'use strict'
const db = require('../models/index.js')
const express = require('express')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $or: Op.or,
}

class SupplierCRUD {

  static supplierPage(req,res){
    db.Supplier.findAll({
      include: [
        { model: db.Item },
        { model: db.SupplierItem }
      ]
    }).then(foundSuppliers => {
      // res.send('supplier page')
      // console.log(foundSuppliers[0].SupplierItems[0].price);
      res.render('./supplier/supplier.ejs', {
        title:'Supplier Page',
        header:'Suppliers',
        foundSuppliers:foundSuppliers,
        err: null
      })
    })
  }

  // <!-- <ol>
  // <% for (let j = 0; j < foundSuppliers[i].Items.length; j++) { %>
  //   <li><%= foundSuppliers[i].Items[j].nam %></li>
  // <% } %>
  // </ol> -->

  static supplierAddPage(req,res){

    // res.send('supplier add')
    res.render('./supplier/supplierAddForm.ejs', {
      title:'Adding Supplier',
      header:'Add Supplier',
      supplierData: {
        name: '',
        kota: ''
      },
      err: null
    })
  }

  static supplierAddPagePost(req,res){
    db.Supplier.create({
      name: req.body.name,
      kota: req.body.kota,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(newSupplier=>{
      res.redirect('/suppliers')
    }).catch(err=>{
      res.render('./supplier/supplierAddForm.ejs', {
        title:'Adding Supplier',
        header:'Add Supplier',
        supplierData: {
          name: req.body.name,
          kota: req.body.kota
        },
        err: err
      })
    })

  }

  static supplierEditPage(req,res){
    let supplierId = req.params.id
    db.Supplier.findById(supplierId).then(foundSupplier => {
      // res.send('supplier edit')
      res.render('./supplier/supplierEditForm.ejs', {
        title:'Editing Supplier Data',
        header:'Editing Supplier',
        supplierId: supplierId,
        foundSupplier: foundSupplier,
        err: null
      })
    })

  }

  static supplierEditPagePost(req,res){
    let supplierId = req.params.id
    db.Supplier.update(
      {
        name: req.body.name,
        kota: req.body.kota,
        updatedAt: new Date()
      },
      {
        where:{
          id:req.params.id
        }
      }
    ).then(updatedSupplier=>{
      // res.send('supplier edit')
      res.redirect('/suppliers')
    }).catch(err=>{
      res.render('./supplier/supplierEditForm.ejs', {
        title:'Editing Supplier Data',
        header:'Editing Supplier',
        supplierId : supplierId,
        foundSupplier: {
          name: req.body.name,
          kota: req.body.kota
        },
        err: err
      })
    })
  }

  static supplierAddItem(req, res){
    let supplierId = req.params.id

    // let supplierPromise =
    // let itemPromise =

    db.Supplier.findById(supplierId,{
      include: [
        { model: db.Item },
        { model: db.SupplierItem }
      ]
    }).then(foundSupplier=>{
      let notInID = [];
      if (foundSupplier.Items.length > 0) {
        for (let Item of foundSupplier.Items) {
          notInID.push(Item.id)
        }
      }
      return db.Item.findAll({
        where:{
          id : { [Op.notIn] : notInID}
        }
      }).then(function(foundItems){
        return [foundSupplier, foundItems]
      })
    }).then(SupplierAndItems=>{
      res.render('./supplier/supplierAddItemForm.ejs', {
        title:'Adding Item for Supplier',
        header:'Add Item for Supplier',
        supplierData: {
          id: SupplierAndItems[0].id,
          name: SupplierAndItems[0].name,
          kota: SupplierAndItems[0].kota,
          items: SupplierAndItems[0].Items,
          SupplierItems: SupplierAndItems[0].SupplierItems
        },
        ItemsData: SupplierAndItems[1],
        err: null
      })

    })

  }

  static supplierAddItemPost(req, res){
    db.SupplierItem.create({
      SupplierId: req.body.SupplierId,
      ItemId: req.body.ItemId,
      price: req.body.price,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(newSupplierItem=>{
      res.redirect('/suppliers')
    })
    // res.send(req.body)
  }


  static supplierDeletePage(req,res){
    db.Supplier.destroy(
      {
        where: {
          id:req.params.id
        }
      }
    ).then(()=>{
      res.redirect('/suppliers')
    }).catch(err=>{
      console.log('---delete---'+err);
    })
    // res.send('supplier delete')
  }

}

module.exports = SupplierCRUD;
