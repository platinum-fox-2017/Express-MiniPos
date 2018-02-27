'use strict';
const fs = require('fs');
var items = fs.readFileSync('./items.csv','utf8').split('\n');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrayOfItems = [];
    for(let i=1;i<items.length-1;i++){
      let item = items[i].split(',');
      let nama = item[0];
      let merk = item[1];
      let kode = item[2];
      let waktuSekarang = new Date();
      let updateNanti = new Date();
      arrayOfItems.push({name:nama,brand:merk,codeItem:kode,createdAt:waktuSekarang,updatedAt:updateNanti});
    }
    return queryInterface.bulkInsert('Items',arrayOfItems,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items',null,{});
  }
};
