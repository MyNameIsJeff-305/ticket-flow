const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage("Username is required"),
    check('firstName').exists({ checkFalsy: true }).withMessage("First Name is required"),
    check('lastName').exists({ checkFalsy: true }).withMessage("Last Name is required"),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    singleMulterUpload('image'),
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const profilePicUrl = req.file ?
            await singleFileUpload({ file: req.file, public: true }) :
            null;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, username, hashedPassword, firstName, lastName, profilePicUrl });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicUrl: user.profilePicUrl
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

//Edit a User
router.put(
    '/:id',
    requireAuth,
    singleMulterUpload('image'),
    async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        const { email, password, username, firstName, lastName } = req.body;
        const profileImageUrl = req.file ?
            await singleFileUpload({ file: req.file, public: true }) :
            null;

        console.log(email, password, username, firstName, lastName, profileImageUrl, "HEYYYYYYYYYY");

        const hashedPassword = bcrypt.hashSync(password);
        await user.update({ email: email || user.email, username: username || user.username, hashedPassword: hashedPassword || user.hashedPassword, firstName: firstName || user.firstName, lastName: lastName || user.lastName, profilePicUrl: profileImageUrl || user.profilePicUrl });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicUrl: user.profilePicUrl
        };

        await setTokenCookie(res, safeUser);

        return res.json(safeUser);
    }
);

//Get a User by ID
router.get(
    '/:id',
    requireAuth,
    async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        return res.json(user);
    }
);

//Get all Users
router.get(
    '/',
    requireAuth,
    async (_req, res) => {
        const users = await User.findAll();
        return res.json(users);
    }
);

module.exports = router;