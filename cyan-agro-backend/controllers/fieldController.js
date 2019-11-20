const { Fields, Farms } = require('../database/models');

exports.getAll = async function (req, res) {
    try {
        const fields = await Fields.findAll({ where: req.query,
            include: [{
                model: Farms,
                as: 'farm'}
            ] });
        res.status(200).json({ data: fields })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving fields' } })
    }
};

exports.get = async function (req, res) {
    try {
        const fields = await Fields.findOne({ where: { id: req.params.id } });
        if (fields) {
            res.status(200).json({ data: fields })
        } else {
            res.status(400).json({ data: { message: 'Field not find' } })
        }
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving fields' } })
    }
};

exports.add = async function (req, res) {
    try {
        const result = await Fields.create(req.body);
        res.status(201).json({ data: { message: "Successfully created result with id: " + result.id } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error creating a field' } })
    }
}

exports.update = async function (req, res) {
    try {
        const field = await Fields.findOne({
            where: {
                id: req.params.id
            },
        });
        if (field) {
            await field.update(req.body);
        } else {
            res.status(400).json({ data: { message: 'Field not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to update a field' } })
    }
};

exports.delete = async function (req, res) {
    try {
        const field = await Fields.findOne({
            where: {
                id: req.params.id
            },
        });
        if (field) {
            await field.destroy();
        } else {
            res.status(400).json({ data: { message: 'Field not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to remove a field' } })
    }
};