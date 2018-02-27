'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        isCodeItem(value){
          let reg = new RegExp(/(HP|SW|LP)\d{4}\b/)
          if (!reg.test(value)) {
            throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka')
          }
        },
        isUnique(value, callback){
          Item.findOne({
            where:{
              codeitem: value
            }
          }).then(foundItem=>{
            if (foundItem) {
              callback('Code Item harus Unik')
            } else {
              callback()
            }
          })
        }
      }
    }
  }, {
    // hook
  });
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier , { through:models.SupplierItem })
    Item.hasMany(models.SupplierItem)
  };
  return Item;
};
