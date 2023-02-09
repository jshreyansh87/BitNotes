const express = require('express');
const User = require('../Models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post('/users', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password with min length 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // search for duplicate user with email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // encrpyt password with hash and salt
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        // create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        });

        res.json({ user });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occured while processing your request" });
    }
});

module.exports = router;