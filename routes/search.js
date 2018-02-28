const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models')
const sequelize = require('sequelize');
const Op = sequelize.Op;

router.get('/', (request,response) => {
    models.Supplier.findAll({
        include: [{
            model: models.Item
        }]
    }).then(projects => {
        let obj= {
            title: 'Search Page',
            arrResult: projects
        }
        // response.send(obj);
        response.render('search.ejs'); // return array of objects supplier
    })
});


router.post('/', (request,response) => {
    // response.send(objSearch);
    let objSearch = {
        SearchedName: request.body.SearchedName,
        MinPrice: request.body.MinPrice,
        MaxPrice: request.body.MaxPrice
    };

    models.Supplier.findAll({
        include: [{
            model: models.Item
        }]
    }).then(projects => {

        models.Item.findAll({
            include: [{
                model: models.Supplier
            }],
            where: {
                Name: {
                    [Op.iLike]: `%${objSearch.SearchedName}%`
                },
                '$Suppliers.SupplierItem.Price$': {
                    [Op.between]: [objSearch.MinPrice, objSearch.MaxPrice]
                }
            }
        }).then(projects1 => {
            
            let objHasil= {
                title: 'Search Page',
                arrObjSearch: objSearch,
                arrResult: projects1
            }
    
            // response.send(objHasil.arrResult);
            response.render('search_result.ejs', objHasil); // return array of objects supplier

        })

    })
});



module.exports = router;