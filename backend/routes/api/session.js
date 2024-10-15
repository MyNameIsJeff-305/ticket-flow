const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

//Get Current User
router.get('/', async (req, res, next) => {
    try {
        if (req.user === null)
            return res.status(200).json({
                user: null
            })

        const currentUser = await User.findByPk(parseInt(req.user.id));

        res.json({
            user: {
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                username: currentUser.username,
                profilePicUrl: currentUser.profilePicUrl
            }
        } || { user: null });
    } catch (error) {
        next(error);
    }
});

//Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential
                }
            }
        });

        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

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

//Log out
router.delete('/', (_req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ message: 'success' })
    } catch (error) {
        next({
            message: 'Logout error. (DELETE) backend/routes/api/session.js'
        })
    }
});

// Restore session user
router.get(
    '/',
    (req, res) => {
        const { user } = req;
        if (user) {
            const safeUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                profilePicUrl: user.profilePicUrl
            };
            return res.json({
                user: safeUser
            });
        } else return res.json({ user: null });
    }
);

module.exports = router;