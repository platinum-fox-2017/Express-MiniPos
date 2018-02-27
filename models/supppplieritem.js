'use strict';
module.exports = (sequelize, DataTypes) => {
  var supppplieritem = sequelize.define('supppplieritem', {
    id : {type:DataTypes.INTEGER,allowNull: false,autoIncrement: true,primaryKey:true},
    supplier_Id: DataTypes.INTEGER,
    item_Id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  supppplieritem.associate = function(models) {
    supppplieritem.belongsTo(models.supplier,{foreignKey:'supplier_Id'})
    supppplieritem.belongsTo(models.item,{foreignKey:'item_Id'})
  };
  return supppplieritem;
};
