'use strict';
module.exports = (sequelize, DataTypes) => {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:{
      type:DataTypes.STRING,
      validate:{
        is:{
          args:/(HP|SW|LP)\d{4}$/i,
          msg:'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'
        },
        codeunik(value,next) {
          item.findAll({where: {codeitem:value}}).then(data=>{
            if(data.length>0){
              next('Code Item harus Unik')
            }else{
              next()
            }
          })
        }
      }
    }
  }, {});
  item.associate = function(models) {
    item.belongsToMany(models.supplier,{through:models.supppplieritem,foreignKey:'item_Id'})
    item.hasMany(models.supppplieritem,{foreignKey:'item_Id'})
  };
  return item;
};
