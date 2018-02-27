'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:{
      type:DataTypes.STRING,
      validate:{
        formatCode:function(value){
          let regex = /(HP|SW|LP)\d{4}/
          if(!regex.test(value)){
            throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka')
          }
        },
        isUnique:((value,next)=>{
          Item.findAll({where:{
            codeitem:value}})
            .then(data=>{
            if(data.length !== 0){
              next('Code item harus unik')
            }else{
              next(); 
            }
          }).catch(err=>{
            next(err)
          })
        })
      }
    } 
  });
  Item.associate = function(models){
    Item.belongsToMany(models.Supplier,{through :models.SupplierItem,foreignKey: 'ItemId'})
    Item.hasMany(models.SupplierItem,{foreignKey: 'ItemId'})
  };
  return Item;
};