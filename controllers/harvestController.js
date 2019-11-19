const { Harvests, Mills, Farms } = require('../database/models');

exports.getAll = async function (req, res) {
    try {
        const harvests = await Harvests.findAll({ 
            where: req.query,
            include: [{
                model: Mills,
                as: 'mill'
            },
            {
                model: Farms,
                as: 'farms'
            }]
         });
        res.status(200).json({ data: harvests })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving harvests' } })
    }
};

exports.get = async function (req, res) {
    try {
        const harvests = await Harvests.findOne({ where: { id: req.params.id } });
        if (harvests) {
            res.status(200).json({ data: harvests })
        } else {
            res.status(400).json({ data: { message: 'Harvest not find' } })
        }
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving harvest' } })
    }
};

exports.add = async function (req, res) {
    try {
        const result = await Harvests.create(req.body);
        res.status(201).json({ data: { message: "Successfully created harvest with id: " + result.id } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error creating a harvest' } })
    }
}

exports.update = async function (req, res) {
    try {
        const harvest = await Harvests.findOne({
            where: {
                id: req.params.id
            },
        });
        if (harvest) {
            await harvest.update(req.body);
        } else {
            res.status(400).json({ data: { message: 'Harvest not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to update a harvest' } })
    }
};

exports.delete = async function (req, res) {
    try {
        const harvest = await Harvests.findOne({
            where: {
                id: req.params.id
            },
        });
        if (harvest) {
            await harvest.destroy();
        } else {
            res.status(400).json({ data: { message: 'Harvest not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to remove a harvest' } })
    }
};