const express = require('express');
const User = require('../Models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/users', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password with min length 5').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {
        console.log(err);
        res.status(400).json({error: 'Please enter a unique email'});
    });
});

module.exports = router;