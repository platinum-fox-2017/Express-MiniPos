'use strict';
module.exports = (sequelize, DataTypes) => {
  var supplier = sequelize.define('supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  },{
    hooks:{
      afterDestroy:(supplier,option)=>{
        sequelize.models.supplierItem.findAll({where:{
          supplierId: supplier.id
        }}).then(hasil =>{
          const Destroy = hasil.map(each =>{
            return new Promise ((resolve,reject)=>{
              sequelize.models.supplierItem.destroy({where:{
                supplierId : each.supplierId
              }}).then(result =>{
                resolve(result)
              })
            })
          })
          Promise.all(Destroy).then()
        })
      }
    }
  })

  supplier.associate = function(models){
    supplier.belongsToMany(models.item,{
      through : 'supplierItem',
      foreignKey : 'supplierId'
    })

    supplier.hasMany(models.supplierItem,{foreignKey : 'supplierId'})
  }

  return supplier;
};