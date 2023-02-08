const express = require('express');
const User = require('../Models/Users');
const router = express.Router();

router.post('/users', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = router;