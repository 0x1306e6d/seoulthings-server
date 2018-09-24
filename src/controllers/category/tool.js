const debug = require('debug')('seoulthings:controllers:category:tool');
const models = require('./../../models');

module.exports = (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;
    debug('get tool rental information from %d (%d)', offset, limit);

    models.Thing
        .findAll(
            {
                where: { category: 'TOOL' },
                order: [['id', 'ASC']],
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
            debug('Tool rental information: %s', things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to find tool rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};