'use strict';
const model = require('../models')

module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    Name: DataTypes.STRING,
    Brand: DataTypes.STRING,
    CodeItem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^(HP|SW|LP)\d{4}$/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
      },
      isUnique(value, cb) {
        Item.findOne({
          where: {
            CodeItem: value
          }
        })
        .then((data) => {
          if (data.length > 0){
            return cb('Code Item harus unik!')
          }
        })
        .catch(() => {
          cb()
        })
      }
      }
    }
  }, {
    hooks: {
      beforeBulkDestroy: (user, options) => {
        sequelize.models.SupplierItem.destroy({
          where: {ItemId: user.where.id}
        }).then(data => {
          console.log('conjuction record destroyed', data)
        })
      }
    }
  });
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier, {through: models.SupplierItem})
    Item.hasMany(models.SupplierItem)
  };
  return Item;
};