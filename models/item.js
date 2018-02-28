'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        isRightFormatItem: function (value) {
          if (value.search(/(HP|SW|LP)\d{4}/) === -1) {
            throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka')
          }
        },
        isUnique: function (value, next) {
          console.log(this.id)
          Item.findOne({
            where: {
              codeitem: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
          .then(item => {
            if(item === null) {
              next()
            } else {
              next(`Code Item harus Unik`)
            }
          })
          .catch(err => {
            next(err);
          })
        }
      }
    }
  }, {
    hooks: {
      afterDestroy: (value, option) => {
        console.log('ini dari hooks', value.id)
        sequelize.models.SupplierItem.destroy({
          where: {
            ItemId: value.id
          }
        })
        .then(() => {
          console.log('SUCCESS CONJ DATA')
        })
        .catch(err => { 
          console.log(err)
        })
      } 
    }
  });
  Item.associate = function(models) {
    Item.hasMany(models.SupplierItem, { foreignKey: 'ItemId' })
    Item.belongsToMany(models.Supplier, { through: 'models.SupplierItem', foreignKey: 'ItemId' })
  };
  return Item;
};
