const debug = require('debug')('seoulthings:controllers:category:medicalDevice');
const models = require('./../../models');

module.exports = (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;
    debug('get medical device rental information from %d (%d)', offset, limit);

    models.Thing
        .findAll(
            {
                where: { category: 'MEDICALDEVICE' },
                order: [[models.sequelize.col('location.name'), 'ASC']],
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
            debug('Mdeical device rental information: %s', things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to find medical device rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};