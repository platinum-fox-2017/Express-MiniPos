'use strict';
const op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:{ 
      type : DataTypes.STRING,
      validate : {
        isFormat : (value,next)=>{
          if(value.search(/(HP|SW|LP)\d{4}/) === -1){
            next('Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka')
          }else{
            next()
          }
        },
      isDouble : (value,next)=>{
        item.findOne({
          where:{
            codeitem:value,
            id : {[op.ne]:this.id}
          }
        }).then(item=>{
          if(item === null){
            next()
          }else{
            next('maaf code item sudah di pakai ')
          }
        })
      }
    }
  }
},{
  hooks:{
    afterCreate:(item,option)=>{
      sequelize.models.SupplierItem({where:{
        ItemId: item.id
      }}).then(hasil =>{
        const Destroy = hasil.map(each =>{
          return new Promise ((resolve,reject)=>{
            sequelize.models.SupplierItem.destroy({where:{
              ItemId : each.ItemId
            }}).then(result =>{
              resolve(result)
            })
          })
        })

        Promise.all(Destroy).then(kelar =>{
          
        })
      })
    }
  }
})

  item.associate = function(models){
    item.belongsToMany(models.supplier,{
      through : 'supplierItem',
      foreignKey : 'itemId'
    })

    item.hasMany(models.supplierItem,{foreignKey : 'itemId'})

  }
  
  return item;
};