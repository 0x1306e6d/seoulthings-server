const debug = require('debug')('seoulthings:controllers:category:bicycle');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;

    debug('get bicycle rental information from %d to %d', start, end);
    res.sendStatus(501);
};