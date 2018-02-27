'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
        type: DataTypes.STRING,
        validate:{
            isFormat(value){
                if(!(/^(HP|SW|LP)\d{4}$/.test(value))){
                    throw new Error('Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka');
                }
            },
            isUnique(value, next){
                Item.findAll({
                    where:{
                        codeitem: value
                    }}).then((data)=> {
                        if(data.length!=0){
                            return next('Code Item harus Unik');
                        }
                        return next();
                    }).catch(err => {
                        return next(err);
                    });
            }
        }
    }
  }, {
      hooks: {
          afterBulkDestroy: (options) => {
              sequelize.models.SupplierItem.destroy({
                  where:{
                      ItemId: options.where.id
                  }
              });
          }
      }
  });
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier,{through:models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  };
  return Item;
};
