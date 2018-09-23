const debug = require('debug')('seoulthings:controllers:category:powerBank');
const models = require('./../../models');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    debug('get power bank rental information from %d to %d', start, end);

    if (start > end) {
        console.error("Power bank query's start offset must be smaller than end. (start: %d, end: %d)", start, end);
        res.sendStatus(400);
        return;
    }

    models.Things
        .findAll(
            {
                where: { category: 'POWERBANK' },
                order: [['id', 'ASC']],
                offset: (start - 1),
                limit: (end - start + 1),
            }
        )
        .then((things) => {
            debug('Power bank rental information: %s', things);

            res.status(200).send(things);
        })
        .catch((err) => {
            console.error('Failed to find power bank rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};