'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate: {
        checkCode: function(value){
          if(value.search(/(HP|SW|LP)\d{4}$/i) === -1){
            throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka')
          }
        },
        checkUnique: function(value, pass){
          Item.findOne({
            where: {
              codeItem: value
            }
          }).then(function(result){
            if(result === null){
              return pass()
            }
            else{
              return pass('Code Item harus Unik')
            }
          }).catch(err => {
            return pass()
          })
        }
      }
    }
  }, {
    hooks: {
      afterBulkDestroy: (instance) => {
        sequelize.models.SupplierItem.destroy({
          where:{
            ItemId: instance.where.id
          }
        })
        // console.log(instance.id)
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