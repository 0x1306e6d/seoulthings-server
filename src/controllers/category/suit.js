const debug = require('debug')('seoulthings:controllers:category:suit');
const models = require('./../../models');

module.exports = (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;
    debug('get suit rental information from %d (%d)', offset, limit);

    models.Thing
        .findAll(
            {
                where: { category: 'SUIT' },
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
            debug('Suit rental information: %s', things);

            res.status(200).send({ things: things });
        })
        .catch((err) => {
            console.error('Failed to find suit rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};