'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'
        },
        isUnique(value, callback){
          sequelize.models.Item.findAll({})
            .then((dataItems)=> {
              for(let i in dataItems){
                if(value == dataItems[i].codeItem){
                  callback('Code Item harus Unik')
                }
              }
              callback('')
            })
        }
      }
    }
  }, {hooks: {
      beforeBulkDestroy: (user, options) => {
        sequelize.models.SupplierItem.destroy({
          where:{ItemId: user.where.id}
        })
      }
    }});
  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier,{through:models.SupplierItem});
  };
  return Item;
};
