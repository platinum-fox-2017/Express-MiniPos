'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
        },
        isUnique: function (value, next) {
          Item.findOne({
            where: {
              codeitem: value,
              id: {
                [Op.ne]: this.id
              }
            }
          }).then(data => {
            if (data === null) {
              next()
            } else {
              next('CodeItem Already used')
            }
          }).catch((err) => {
            next(err)
          })
        }
      }
    }
  }, {});
  Item.associate = function (models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier, { through: 'SupplierItems', foreignKey: 'itemId' });
  };
  return Item;
};