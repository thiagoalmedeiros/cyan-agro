const { Mills, Harvests } = require('../database/models');

exports.getAll = async function (req, res) {
    try {
        const mills = await Mills.findAll({ 
            where: req.query ,
            include: [{
                model: Harvests,
                as: 'harvests'
        }]});
        res.status(200).json({ data: mills })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving mills' } })
    }
};

exports.get = async function (req, res) {
    try {
        const mills = await Mills.findOne({ where: { id: req.params.id } });
        if (mills) {
            res.status(200).json({ data: mills })
        } else {
            res.status(400).json({ data: { message: 'Mill not find' } })
        }
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving mill' } })
    }
};

exports.add = async function (req, res) {
    try {
        const result = await Mills.create(req.body);
        res.status(201).json({ data: { message: "Successfully created mill with id: " + result.id } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error creating a mill' } })
    }
}

exports.update = async function (req, res) {
    try {
        const mill = await Mills.findOne({
            where: {
                id: req.params.id
            },
        });
        if (mill) {
            await mill.update(req.body);
        } else {
            res.status(400).json({ data: { message: 'Mill not found' } })
        }
        res.status(204).send({})
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to update a mill' } })
    }
};

exports.delete = async function (req, res) {
    try {
        const mill = await Mills.findOne({
            where: {
                id: req.params.id
            },
        });
        if (mill) {
            await mill.destroy();
        } else {
            res.status(400).json({ data: { message: 'Mill not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error trying to remove a mill' } })
    }
};