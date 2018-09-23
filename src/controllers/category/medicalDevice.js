const debug = require('debug')('seoulthings:controllers:category:medicalDevice');
const models = require('./../../models');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    debug('get medical device rental information from %d to %d', start, end);

    if (start > end) {
        console.error("Medical Device query's start offset must be smaller than end. (start: %d, end: %d)", start, end);
        res.sendStatus(400);
        return;
    }

    models.Things
        .findAll(
            {
                where: { category: 'MEDICALDEVICE' },
                order: [['id', 'ASC']],
                offset: (start - 1),
                limit: (end - start + 1),
            }
        )
        .then((things) => {
            debug('Mdeical device rental information: %s', things);

            res.status(200).send(things);
        })
        .catch((err) => {
            console.error('Failed to find medical device rental information.');
            console.error(err);

            res.sendStatus(500);
        });
};