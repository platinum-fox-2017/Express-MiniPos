'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    Name: DataTypes.STRING,
    Brand: DataTypes.STRING,
    CodeItem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka"
        },
        isUnique(values, cb) {
          Item.findAll({}).then(arrItems => {
            for (let i = 0; i < arrItems.length; i++) {
              if (values == arrItems[i].CodeItem) {
                cb('Code Item harus Unik');
              } else {
                cb();
              }
            }
          })
        }
      }
    } 
  }, {} );
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier, {through: models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  };
  return Item;
};