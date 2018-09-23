const debug = require('debug')('seoulthings:controllers:category:tool');
const models = require('./../../models');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    debug('get tool rental information from %d to %d', start, end);

    if (start > end) {
        console.error("Tool query's start offset must be smaller than end. (start: %d, end: %d)", start, end);
        res.sendStatus(400);
        return;
    }

    models.Things
        .findAll(
            {
                where: { category: 'TOOL' },
                order: [['id', 'ASC']],
                offset: (start - 1),
                limit: (end - start + 1),
            }
        )
        .then((things) => {
            debug('Tool rental information: %s', things);

            res.status(200).send(things);
        })
        .catch((err) => {
            console.error('Failed to find tool rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};