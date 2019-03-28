const debug = require('debug')('seoulthings:controllers:thing');
const express = require('express');
const router = express.Router();

const models = require('./../../models');

router.get('/:thingId', (req, res) => {
    const thingId = req.params.thingId;
    debug('getting a thing of id %s.', thingId);

    models.Thing
        .findOne(
            {
                where: { id: thingId },
                include: [
                    {
                        model: models.Location,
                        as: 'location',
                    }
                ],
            }
        )
        .then((thing) => {
            debug('A thing of id %s is %o.', thingId, thing);

            if (thing) {
                res.status(200).send({ size: 1, thing: thing });
            } else {
                res.status(200).send({ size: 0 });
            }
        })
        .catch((err) => {
            console.error('Failed to get a thing of id %s.', thingId);
            console.error(err);

            res.sendStatus(500);
        });
});

module.exports = router;