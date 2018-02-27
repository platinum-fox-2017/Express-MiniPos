'use strict';
module.exports = (sequelize, DataTypes) => {
  var Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        custom_validate: function(value,next){
          let match = /(HP|SW|LP)\d{4}/.test(value);
          // console.log(match);
          if(match === true){
            next();
          } else {
            next(`Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka`);
          }
        },
        custom_validate2: function(value,next){
          Items.findAll()
          .then((found) => {
            found.forEach((v,i,a) => {
              if(value === v.codeitem) next(`Code Item harus Unik`)
            })
            next();
          })
        }
      }
    }
  });
  Items.associate = models => {
    Items.belongsToMany(models.Suppliers, {
      through: 'SupplierItems',
      foreignKey: 'ItemId',
    })
  }
  return Items;
};

// 5. Buatlah validasi pada model Item untuk memeriksa input codeitem. Input codeitem harus
// a. Berformat yang benar, [2huruh (HP|SW|LP)][4angka] contoh: ‘HP1234’
// i. Hint : gunakan regex berikut “/(HP|SW|LP)\d{4}/“
// ii. Pesan eror : ‘Code Item harus diawali dengan HP | SW | LP dan diikuti’
// dengan 4 digit angka
// b. Kode harus unik (unique)
// i. Pesan Error: ‘Code Item harus Unik’
// *pesan error harus sesuai bila tidak ada pengurangan nilai


// var ValidateMe = sequelize.define('Foo', {
//   phone: {
//       type: Sequelize.STRING(20),
//       validate: {
//           validatePhone: function(value) {
//              if(!/^(13|14|15|17|18)\d{9}$/i.test(value) && !/^((\(\d{2,3}\))|(\d{3}\-)|(\d{3}))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value)) {
//                 throw new Error('phone format error!')
//              }
//           }
//       }
//   }
// })


// User.find({where:{email: email}})
// .success(function (u) { // This gets called
//   if(u){
//     throw new Error({error:[{message:'Email address already in use!'}]});  // But this isn't triggering a validation error.
//   }
// });
// }