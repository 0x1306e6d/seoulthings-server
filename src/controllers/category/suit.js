const debug = require('debug')('seoulthings:controllers:category:suit');
const models = require('./../../models');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    debug('get suit rental information from %d to %d', start, end);

    if (start > end) {
        console.error("Suit query's start offset must be smaller than end. (start: %d, end: %d)", start, end);
        res.sendStatus(400);
        return;
    }

    models.Things
        .findAll(
            {
                where: { category: 'SUIT' },
                order: [['id', 'ASC']],
                offset: (start - 1),
                limit: (end - start + 1),
            }
        )
        .then((things) => {
            debug('Suit rental information: %s', things);

            res.status(200).send(things);
        })
        .catch((err) => {
            console.error('Failed to find suit rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};