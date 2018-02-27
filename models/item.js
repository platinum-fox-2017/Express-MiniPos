'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/i,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        },
        isUnique(value, next) {
          Item.findAll({where:{codeitem: value}})
          .then(exist =>{
            if(exist.length>0){next('Code Item harus Unik')}
            next();
          })
        }
      }
    }
  }, {
    hooks: {
      afterBulkDestroy: (instance) => {
        let ItemId = instance.where.id;
        sequelize.models.SupplierItem.destroy({where: {ItemId: ItemId}})
        .then(() => {})
        .catch(err => console.log(err))
      }
    }
  });
  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier, {through: models.SupplierItem}),
    Item.hasMany(models.SupplierItem)
  };
  return Item;
};