const debug = require('debug')('seoulthings:controllers:category:bicycle');
const models = require('./../../models');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    debug('get bicycle rental information from %d to %d', start, end);

    if (start > end) {
        console.error("Bicycle query's start offset must be smaller than end. (start: %d, end: %d)", start, end);
        res.sendStatus(400);
        return;
    }

    models.Things
        .findAll(
            {
                where: { category: 'BICYCLE' },
                order: [['id', 'ASC']],
                offset: (start - 1),
                limit: (end - start + 1),
            }
        )
        .then((things) => {
            debug('Bicycle rental information: %s', things);

            res.status(200).send(things);
        })
        .catch((err) => {
            console.error('Failed to find bicycle rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};