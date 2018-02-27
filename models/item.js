'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type : DataTypes.STRING,
      validate : {
        checkCode(value) {
          if(! value.match(/(HP|SW|LP)\d{4}/)) {
            throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka')
          }
        },
        checkUnique(value, callback) {
          Item.findOne({
            where : {codeitem : value}
          })
          .then(itemscode => {
            if(itemscode) {
              callback('Code Item harus Unik');  
            } else {
              callback()
            }
          })
        }
      }
    }
  }, 
  {
    hooks : {
    afterDestroy: (instance) => {
      sequelize.models.SupplierItem.destroy({
        where : {ItemId : instance.id}
      })
    }
  }});
  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier, {through : models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  };
  return Item;
};