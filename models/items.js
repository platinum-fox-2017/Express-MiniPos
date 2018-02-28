'use strict';
module.exports = (sequelize, DataTypes) => {
  var Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        custom_validate: function(value,next){
          let match = /(HP|SW|LP)\d{4}/.test(value);
          if(match === true){
            next();
          } else {
            next(`Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka`);
          }
        },
        custom_validate2: function(value,next){
          Items.findAll()
          .then((found) => {
            found.forEach((v,i,a) => {
              if(value === v.codeitem) next(`Code Item harus Unik`);
            })
            next();
          })
        }
      }
    }
  },{
    hooks: {
      
    }
  });
  Items.associate = models => {
    Items.belongsToMany(models.Suppliers, {
      through: 'SupplierItems',
      foreignKey: 'ItemId',
    })
  }
  return Items;
};