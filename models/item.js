'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate:{
        is:{
          args: /(HP|SW|LP)\d{4}/,
          msg:'Code Item harus diawali dengan HP | SW | LP dan diikuti' 
        },
        isUnique:(value, next)=>{
          Item.findAll({
            where:{
              codeItem:value,
              id: { [Op.ne]: this.id,}
            }
          }).then(data =>{
            if(data.length !== 0){
              next('Code Item harus Unik')
            }else{
              next()
            }
          }).catch(err=>{
            next(err)
          })
        }
      }
    },
  }, {});
  Item.associate = models=>{
    Item.belongsToMany(models.Supplier,{
      through:'SupplierItem',
      foreignKey: 'SupplierId'
    })
  }
  return Item;
};