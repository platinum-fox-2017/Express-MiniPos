'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type:DataTypes.STRING,
      validate:{
        regCode:function(value,next){
          console.log(value);
          let reg = /(HP|SW|LP)\d{4}/.test(value)
          if(reg === true){
            next()
          } else {
            next("Format Pengisian Item Code Anda Salah")
          }
        },
        isUnique:function(value,next){
          console.log('ini satu',this.dataValues);
          Item.findOne({
            where:{
              codeitem: value,
              id : {[Op.ne]:this.id}
            }
          }).then(item => {
            console.log(this.dataValues);
            if(item === null){
              next()
            }else{
              next(`ITEM CODE is already exists`)
            }
          }).catch(err => {
            next(err)
          })
        }
      }
    }
  })
  Item.associate = function(models) {
    Item.hasMany(models.SupplierItem)
    Item.belongsToMany(models.Supplier,{through:"SupplierItem"})
  };
  return Item;
};
