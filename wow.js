{
hooks:{
  afterDestroy:(item,option)=>{
    sequelize.models.SupplierItem.findAll({where:{
      ItemId: item.id
    }}).then(result =>{
      const Destroy = result.forEach(data =>{
        return new Promise ((resolve,reject)=>{
          sequelize.models.SupplierItem.destroy({where:{
            ItemId : data.ItemId
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
