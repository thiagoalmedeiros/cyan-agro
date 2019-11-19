const { Farms, Harvests, Fields } = require('../database/models');

exports.getAll = async function (req, res) {
    try {
        const farms = await Farms.findAll({ 
            where: req.query,
            include: [
                {
                    model: Harvests,
                    as: 'harvest'
                },
                {
                model: Fields,
                as: 'fields'
            }
            ]
         });
        res.status(200).json({ data: farms })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving farms' } })
    }
};

exports.get = async function (req, res) {
    try {
        const farms = await Farms.findOne({ where: { id: req.params.id } });
        if (farms) {
            res.status(200).json({ data: farms })
        } else {
            res.status(400).json({ data: { message: 'Farm not find' } })
        }
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving farm' } })
    }
};

exports.add = async function (req, res) {
    try {
        const result = await Farms.create(req.body);
        res.status(201).json({ data: { message: "Successfully created farm with id: " + result.id } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error creating a farm' } })
    }
}

exports.update = async function (req, res) {
    try {
        const farm = await Farms.findOne({
            where: {
                id: req.params.id
            },
        });
        if (farm) {
            await farm.update(req.body);
        } else {
            res.status(400).json({ data: { message: 'Farm not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to update a farm' } })
    }
};

exports.delete = async function (req, res) {
    try {
        const farm = await Farms.findOne({
            where: {
                id: req.params.id
            },
        });
        if (farm) {
            await farm.destroy();
        } else {
            res.status(400).json({ data: { message: 'Farm not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to remove a farm' } })
    }
};