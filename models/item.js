'use strict'



module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: {
      type:  DataTypes.STRING,
      validate:{
        checkFirstLetter : (value,next) =>{
          let firstIndex = value[0].toUpperCase()
          if(value[0] !== firstIndex){
            next("Depan harus huruf besar")
          }else{
            next()
          }
        }
      }
    },
    codeItem: {
      type:DataTypes.STRING,
      validate : {
        standardCode : function(value){
        let reg = /(HP|SW|LP)\d{4}/
          if(value.search(reg) === -1){
            throw new Error (`Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka`)
          }
        },
      },
      checkDouble: function(value,next){
        Item.findOne({
          where:{
            codeItem: value
          }
        }).then(item => {
          if(item.id !== Number(this.id)){
            next(`Code sudah ada bro`)
          }else{
            next()
          }
        }).catch(err => {
          next(err)
        })
      }
    }
  },{
    hooks:{
      beforeCreate: function(user,options){
        
      },
      beforeDestroy: function(item,options){
        sequelize.models.SupplierItem.findAll({
          where:{
            ItemId : item.id
          }
        }).then(result=>{
          const deleteAll = result.map(each=>{
            return new Promise ((resolve,reject)=>{
              sequelize.models.SupplierItem.destroy({
                where:{
                  ItemId: each.ItemId
                }
              }).then(result =>{
                resolve(result)
              }).catch(err=>{reject(err)})
            })
          })

          Promise.all(deleteAll).then(hasil =>{
            console.log(hasil)
          })
        })
      }
    }
  });

  Item.associate = function (models){
    Item.hasMany(models.SupplierItem,{
      foreignKey: 'ItemId',
      onDelete : 'CASCADE',
      hooks: true
    })

    Item.belongsToMany(models.Supplier,{
      foreignKey: 'ItemId',
      through: 'SupplierItem'
    })
  }
  return Item;
};