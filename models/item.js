'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^(HP|SW|LP)\d{4}$/,
          msg: 'Code Item must start with HP | SW | LP followed by 4 digits'
        },
        isUnique(value, next) {
          Item.findAll({
            where: {
              codeitem: value
            }
          }).then((data) => {
            if(data.length > 0) {
              return next('error unique code item')
            } else {
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
    // associations can be defined here
    Item.belongsToMany(models.Supplier, {through: models.SupplierItem})
    Item.hasMany(models.SupplierItem)
  };

  Item.prototype.getItemBrand = function() {
    return `${this.brand} ${this.name}`
  }
  return Item;
};