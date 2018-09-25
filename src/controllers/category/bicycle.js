const debug = require('debug')('seoulthings:controllers:category:bicycle');
const models = require('./../../models');

module.exports = (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;
    debug('get bicycle rental information from %d (%d)', offset, limit);

    models.Thing
        .findAll(
            {
                where: { category: 'BICYCLE' },
                order: [[sequelize.col('location.name'), 'ASC']],
                include: [
                    {
                        model: models.Location,
                        as: 'location',
                    }
                ],
                offset: offset,
                limit: limit,
            }
        )
        .then((things) => {
            debug('Bicycle rental information: %s', things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to find bicycle rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};