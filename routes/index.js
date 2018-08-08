const express = require('express');
const router = express.Router();

// GET index page
router.get('/', (req, res) => {
    res.sendFile('/pages/index.html', { root: './public' });
});

module.exports = router;