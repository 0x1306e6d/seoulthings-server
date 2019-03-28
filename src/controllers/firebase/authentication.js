const debug = require('debug')('seoulthings:controllers:firebase:authentication');
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.get('/user/:uid', (req, res) => {
    const uid = req.params.uid;

    admin.auth()
        .getUser(uid)
        .then((record) => {
            debug('Successfully fetched user data: %o', record.toJSON());
            res.status(200).send({
                uid: record.uid,
                email: record.email,
                displayName: record.displayName,
                photoURL: record.photoURL
            });
        })
        .catch((err) => {
            console.error('Failed to get user of id %s', userId);
            console.error(err);

            res.sendStatus(500);
        });
});

module.exports = router;