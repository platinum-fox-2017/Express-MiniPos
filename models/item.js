'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {type: DataTypes.STRING,
      validate:{
        isCorrectFormat: (value) => {
          let regex = /(HP|SW|LP)\d{4}/
          if (value.search(regex) === -1) {
            throw new Error(`Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka`)
          }
        },
        checkUnique: (value, next) => {
          Item.findOne({
            where: {
              codeitem: value, id: {[Op.ne]:id}
            }
          }).then(item => {
            if (item.id !== Number(this.id)) {
              next(`Codeitem already exist`)
            } else {
              next()
            }
          }).catch(err => {
            next(err)
          })
        }
      }}
  });
  Item.associate = function (models) {
    Item.hasMany(models.SupplierItem, { foreignKey: 'itemId' })
    Item.belongsToMany(models.Supplier, { through: 'models.SupplierItem', foreignKey: 'itemId' })
  };
  return Item;
};