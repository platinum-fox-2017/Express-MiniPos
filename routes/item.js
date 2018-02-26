const express = require('express');
const app = express();
const router = express.Router()

const models = require('../models')

router.get('/',function(req,res){
  models.Item.findAll().then(items=>{
    // console.log(JSON.parse(JSON.stringify(items)))
    res.render('item/items',{data:items})
  }).catch(err=>{
    res.send(err)
  })
})

module.exports = router



// i.
// GET /items (menampilkan semua data item)
// ii.
// GET /items/add (menampilkan form untuk input)
// iii.
// POST /items/add (menghandle input dari form)
// iv.
// GET /items/edit/:id (menampilkan form data items berdasarkan id)
// v.
// POST /items/edit/:id (meng-handle input dari form saat update)
// vi.
// GET /items/delete/:id (men-delete data items berdasarkan id)