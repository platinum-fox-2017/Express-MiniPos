'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: { msg: 'Name can not be empty' },
    	}
    },
    kota: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: { msg: 'City can not be empty' },
    	}
    }
  }, {
    hooks: {
        afterDestroy: (instance) => {
          sequelize.models.SupplierItem.destroy({
              where: { SupplierId: instance.id }
            })
        }
    }
  });
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item, { through: models.SupplierItem});
    Supplier.hasMany(models.SupplierItem);
  };
  return Supplier;
};