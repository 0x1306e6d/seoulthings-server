const debug = require('debug')('seoulthings:controllers:category:medicalDevice');

module.exports = (req, res) => {
    const start = req.params.start;
    const end = req.params.end;

    debug('get medical device rental information from %d to %d', start, end);
    res.sendStatus(501);
};