const debug = require('debug')('seoulthings:controllers:search:things');
const express = require('express');
const router = express.Router();;

const models = require('./../../models');

router.get('/', (req, res) => {
    const keyword = req.query.keyword;
    debug('search all things with keyword %s', keyword);

    const sequelize = models.sequelize;
    const Sequelize = models.Sequelize;
    models.Thing
        .findAll(
            {
                where: {
                    [Sequelize.Op.or]: {
                        '$Thing.contents$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.name$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.address$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.contact$': { [Sequelize.Op.like]: `%${keyword}%` },
                    },
                },
                order: [[sequelize.col('location.name'), 'ASC']],
                include: [
                    {
                        model: models.Location,
                        as: 'location',
                    }
                ],
            }
        )
        .then((things) => {
            debug('All things search result: %s', things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to search all things.');
            console.error(err);

            res.sendStatus(500);
        });
});

router.get('/:category', (req, res) => {
    const category = req.params.category;
    const keyword = req.query.keyword;
    debug('search %s things with keyword %s', category, keyword);

    const sequelize = models.sequelize;
    const Sequelize = models.Sequelize;
    models.Thing
        .findAll(
            {
                where: {
                    category: category,
                    [Sequelize.Op.or]: {
                        '$Thing.contents$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.name$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.address$': { [Sequelize.Op.like]: `%${keyword}%` },
                        '$location.contact$': { [Sequelize.Op.like]: `%${keyword}%` },
                    },
                },
                order: [[sequelize.col('location.name'), 'ASC']],
                include: [
                    {
                        model: models.Location,
                        as: 'location',
                    }
                ],
            }
        )
        .then((things) => {
            debug('%s things search result: %s', category, things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to search %s things.', category);
            console.error(err);

            res.sendStatus(500);
        });
});

module.exports = router;