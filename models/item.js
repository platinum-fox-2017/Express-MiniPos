'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: { msg: 'Name can not be empty' },
    	}
    },
    brand: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: { msg: 'Brand can not be empty' },
    	}
    },
    codeitem: {
    	type: DataTypes.STRING,
    	validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        },
        isUnique(value, next) {
          if (value) {
            Item.findAll({
              where: { codeitem: value }
            }).then(result => {

              if (result.length >= 1) next('Only unique values are allowed!');
              else next();
            })
          } else {
            next('Code Item can not be empty');
          }
        }
    	},
    },
  }, {
    hooks: {
        afterDestroy: (instance) => {
          sequelize.models.SupplierItem.destroy({
              where: { ItemId: instance.id }
            })
        }
    }
  });

  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier, { through: models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  };

  Item.prototype.brandName = function() {
    return this.brand + ' ' + this.name;
  };

  return Item;
};