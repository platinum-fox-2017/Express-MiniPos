'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type:DataTypes.STRING,
      validate:{
        regCode:function(value){
          let reg = /(HP|SW|LP)\d{4}/
          if(value.search(reg) === -1){
            throw new Error("Format Pengisian Item Code Anda Salah")
          }
        },
        isUnique:function(value,next){
          Item.findAll({
            where:{
              codeitem: value
            }
          }).then(item => {
            if(item.length !== 0){
              next(`ITEM CODE is already exists`)
            }else{
              next()
            }
          }).catch(err => {
            next(err)
          })
        }
      }
    }
  }, {});
  Item.associate = function(models) {
    Item.hasMany(models.SupplierItem)
    Item.belongsToMany(models.Supplier,{through:"SupplierItem"})
  };
  return Item;
};
