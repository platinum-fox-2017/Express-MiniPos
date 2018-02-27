'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
  },{
    hooks:{
      beforeCreate(){
      },
      beforeDestroy(supplier,options){
        sequelize.models.SupplierItem.findAll({
          where:{
            SupplierId: supplier.id
          }
        }).then(hasil=>{
          const destroy = hasil.map(each=>{
            return new Promise((resolve,reject)=>{
              sequelize.models.SupplierItem.destroy({
                where:{SupplierId:each.SupplierId}
              }).then(hasil=>{
                resolve(hasil)
              }).catch((err)=>{reject(err)})
            })
          })

          Promise.all(destroy).then((result)=>{
            consle.log(result)
          })
        })
      }
    }
  });
  Supplier.associate = function(models){
    Supplier.hasMany(models.SupplierItem,{
      foreignKey: 'SupplierId',
      hooks: true
    })

    Supplier.belongsToMany(models.Item,{
      foreignKey: 'SupplierId',
      through: 'SupplierItem'
    })
  }
  return Supplier;
};