const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const redis = require('../redis')
let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
    const result = await redis.getAsync('added_todos');
    res.send({
        "added_todos": result
    });
});

module.exports = router;
