const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, EmployeePhoneNumber, Department } = require('../../db/models');

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
    async (req, res, next) => {
        try {
            const { email, password, username, firstName, lastName, title } = req.body;
            const profilePicUrl = req.file ?
                await singleFileUpload({ file: req.file, public: true }) :
                null;
            const hashedPassword = bcrypt.hashSync(password);

            const noProfilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

            // Find a user that match the email or the username
            const checkUserName = await User.findOne({ where: { username: username } });
            const checkUserEmail = await User.findOne({ where: { email: email } });

            if (checkUserEmail) {
                res.status(500);
                return res.json({
                    message: "User already exists",
                    "errors": {
                        email: "User with this email already exists"
                    }
                })
            }
            if (checkUserName) {
                res.status(500);
                return res.json({
                    message: "User already exists",
                    "errors": {
                        username: "User with this username already exists"
                    }
                })
            }

            const user = await User.create({ email, username, hashedPassword, firstName, lastName, title, profilePicUrl: profilePicUrl || noProfilePic });

            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            };

            await setTokenCookie(res, safeUser);

            return res.json({
                user: safeUser
            });
        } catch (error) {
            next(error);
        }
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
        const { email, password, username, firstName, lastName, isActive } = req.body;
        const profileImageUrl = req.file ?
            await singleFileUpload({ file: req.file, public: true }) :
            null;



        const hashedPassword = bcrypt.hashSync(password);
        await user.update({ email: email || user.email, username: username || user.username, hashedPassword: hashedPassword || user.hashedPassword, firstName: firstName || user.firstName, lastName: lastName || user.lastName, profilePicUrl: profileImageUrl || user.profilePicUrl, isActive: isActive !== undefined ? isActive : user.isActive });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicUrl: user.profilePicUrl,
            isActive: user.isActive
        };

        await setTokenCookie(res, safeUser);

        return res.json(safeUser);
    }
);

// Add a Phone to the Employee
router.post('/:userId/phones', requireAuth, async (req, res) => {
    const { userId } = req.params;
    const { phoneNumber, name } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPhoneNumber = await EmployeePhoneNumber.create({
            employeeId: parseInt(userId),
            phoneNumber,
            name
        })

        return res.json(newPhoneNumber);
    } catch (error) {
        return res.status(500).json({
            message: "Error Adding Phone Number",
            error: error.message
        });
    }
});

//Edit a Phone of an Employee
router.put('/:userId/phones/:phoneId', requireAuth, async (req, res) => {
    const { userId, phoneId } = req.params;
    const { phoneNumber, name } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const phone = await EmployeePhoneNumber.findByPk(phoneId);
        if (!phone || phone.employeeId !== parseInt(userId)) {
            return res.status(404).json({ message: "Phone number not found for this user" });
        }

        await phone.update({
            phoneNumber: phoneNumber || phone.phoneNumber,
            name: name || phone.name
        });

        return res.json(phone);
    } catch (error) {
        return res.status(500).json({
            message: "Error Updating Phone Number",
            error: error.message
        });
    }
});

//Delete a Phone of an Employee
router.delete('/:userId/phones/:phoneId', requireAuth, async (req, res) => {
    const { userId, phoneId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const phone = await EmployeePhoneNumber.findByPk(phoneId);
        if (!phone || phone.employeeId !== parseInt(userId)) {
            return res.status(404).json({ message: "Phone number not found for this user" });
        }

        await phone.destroy();
        return res.json({ message: "Phone number deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error Deleting Phone Number",
            error: error.message
        });
    }
});

//Get a User by ID
router.get('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPhoneNumbers = await EmployeePhoneNumber.findAll({
            where: { employeeId: id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        const userDepartment = await Department.findByPk(user.departmentId, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return res.json({ ...user.toJSON(), department: userDepartment, phoneNumbers: userPhoneNumbers });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

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