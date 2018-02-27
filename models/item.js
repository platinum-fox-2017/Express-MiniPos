'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:{
       type: DataTypes.STRING,
       validate:{
         is:{
           args: /(HP|SW|LP)\d{4}$/i,
           msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
         },
         isUnique: function(value, next){

          Item.find({
            where : {
              codeitem:value,
            }
          }).then(function(result){
            if(result === null){
              return next()
            }else{
              return next('Codeitem Harus Unik')
            }
          }).catch(err =>{
              return next()
          })
        }

       }
    }
  }, {
    hooks: {
      beforeBulkDestroy: (instance) => {
        sequelize.models.SupplierItem.destroy({
          where: {ItemId: instance.where.id}
        })
      }
    }
  }
);
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier,{through: models.SupplierItem})
    Item.hasMany(models.SupplierItem)
  };
  return Item;
};
