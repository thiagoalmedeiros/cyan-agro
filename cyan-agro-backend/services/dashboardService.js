const { Fields, Farms, Harvests, Mills } = require('../database/models');
const Op = require('sequelize').Op
exports.findBy = async (request) => {
    let {millName, startDate, endDate, harvestCode, farmName, farmCode, fieldCode} = request.query;
    
    millName = millName == undefined? '': millName;
    harvestCode = harvestCode == undefined? '': harvestCode;
    farmName = farmName == undefined? '': farmName;
    farmCode = farmCode == undefined? '': farmCode;
    fieldCode = fieldCode == undefined? '': fieldCode;
    startDate = startDate == undefined? '': startDate;
    endDate = endDate == undefined? '': endDate;

    console.log('millName: ', millName)
    console.log('harvestCode: ', harvestCode)
    console.log('farmName: ', farmName)
    console.log('farmCode: ', farmCode)
    console.log('fieldCode: ', fieldCode)
    console.log('startDate: ', startDate)
    console.log('endDate: ', endDate)

    let millNameWhere = {};
    let harvestCodeWhere = {};
    let farmCodeWhere = {};
    let fieldCodeWhere = {};
    let farmNameWhere = {};
    let startWhere = {};
    let endWhere = {};

    if (millName != '') {
        millNameWhere = { 
            name: { [Op.like]: `%${millName}%` }
         }
    }
    if(harvestCode != '') {
        harvestCodeWhere = { code: { [Op.like]: `%${harvestCode}%` } }
    }
    if(fieldCode != '') {
        fieldCodeWhere = { code: { [Op.like]: `%${fieldCode}%` } }
    }
    if(farmCode != '') {
        farmCodeWhere = { code: { [Op.like]: `%${farmCode}%` } }
    }
    if(farmName != '') {
        farmNameWhere = { name: { [Op.like]: `%${farmName}%` } }
    }
    if(startDate != '') {
        startWhere = { startDate: {
            [Op.lte]: startDate
          } }
    }
    if(endDate != '') {
        endWhere = { endDate: {
            [Op.gte]: endDate
          } }
    }

    let options = { 
           where: fieldCodeWhere,
            include: [
                {
                model: Farms,
                as: 'farm',
                required: true,
                where: {
                    [Op.and]: [
                        farmNameWhere,
                        farmCodeWhere
                      ]
                },
                include: [
                    {
                    model: Harvests,
                    as: 'harvest',
                    required: true,
                    where: {
                        [Op.and]: [
                            harvestCodeWhere,
                            startWhere,
                            endWhere
                          ]
                    },
                    include: [
                        {
                        model: Mills,
                        as: 'mill',
                        where: millNameWhere,
                    }
                    ]
                }
                ]
            }
            ] 
        }
    const fields = await Fields.findAll(options);
    if (fields) {
        return fields;
    }
    throw new Error('Usuário inexistente');
};
