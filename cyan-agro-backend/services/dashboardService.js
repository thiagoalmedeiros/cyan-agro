const { Fields, Farms, Harvests, Mills } = require('../database/models');
const Op = require('sequelize').Op
exports.findBy = async (request) => {
    const {millName, startDate, endDate, harvestCode, farmName, farmCode, fieldCode} = request.query;
    console.log('millname: ', millName);
    const fields = await Fields.findAll({ 
    //    where: { 
    //        name: { [Op.like]: `%${millname}%` }
    //     },
        include: [{
            model: Farms,
            as: 'farm',
            //where: req.query,
            include: [{
                model: Harvests,
                as: 'harvest',
               // where: req.query,
                include: [{
                    model: Mills,
                    as: 'mill',
                    where: { name: { [Op.like]: `%${millName}%` } },
                }
                ]
            }
            ]
        }
        ] });
    if (fields) {
        return fields;
    }
    throw new Error('Usuário inexistente');
};
