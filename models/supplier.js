'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Supplier.associate = function(models) {
    // associations can be defined here
  };
  return Supplier;
};