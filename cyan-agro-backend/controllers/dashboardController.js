
const dasboardService = require('../services/dashboardService');

exports.findBy = async function (req, res) {

    try {
        const fields = await dasboardService.findBy(req);        
        res.status(200).json({ data: fields })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving fields' } })
    }
};
