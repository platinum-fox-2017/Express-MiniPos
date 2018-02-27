'use strict';
// const models = require('./index.js')

module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka",
        },
        isUnique(value, msg) {
          Item.findAll({
            where: {codeItem: value}
          })
          .then((data) => {
            if(data.length > 0) {
              msg('Code Item harus Unik')
            } else {
              msg();
            }
          })
        }
      }
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier, {through: 'SupplierItem'});
    Item.hasMany(models.SupplierItem)
  };
  return Item;
};