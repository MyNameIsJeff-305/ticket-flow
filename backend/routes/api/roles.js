const express = require('express');

const { Role, UserRole, User } = require('../../db/models');

const router = express.Router();

//Get All Roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        //Get all the users with that Role in UserRole Table
        const rolesWithUsers = await Promise.all(roles.map(async (role) => {
            const users = await User.findAll({
                include: [{
                    model: UserRole,
                    where: { roleId: role.id }
                }],
                attributes: { exclude: ['departmentId', 'UserRoles', 'createdAt', 'updatedAt'] }
            });
            return { ...role.toJSON(), users };
        }));

        return res.json({...roles.dataValues, rolesWithUsers});
    } catch (error) {
        return res.status(500).json({
            message: "Error Retrieving Roles",
            error: error.message
        });
    }
});

//Get a Role by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        //Get all the users with that Role in UserRole Table
        const users = await User.findAll({
            include: [{
                model: UserRole,
                where: { roleId: role.id }
            }],
            attributes: { exclude: ['departmentId', 'UserRoles', 'createdAt', 'updatedAt'] }
        });

        return res.json({ ...role.toJSON(), users });
    } catch (error) {
        return res.status(500).json({
            message: "Error Retrieving Role",
            error: error.message
        });
    }
});

//Add a Role
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const newRole = await Role.create({
            name,
            description
        });

        return res.status(201).json(newRole);
    } catch (error) {
        return res.status(500).json({
            message: "Error Creating Role",
            error: error.message
        });
    }
});

//Add a Role to a User
router.post('/:roleId/users/:userId', async (req, res) => {
    const { roleId, userId } = req.params;

    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userRole = await UserRole.create({
            userId: parseInt(userId),
            roleId: parseInt(roleId)
        });

        return res.status(201).json({
            message: `Role ${role.name} assigned to user ${user.username}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error Assigning Role to User",
            error: error.message
        });
    }
});

//Remove a Role from a User
router.delete('/:roleId/users/:userId', async (req, res) => {
    const { roleId, userId } = req.params;

    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userRole = await UserRole.findOne({
            where: {
                userId: parseInt(userId),
                roleId: parseInt(roleId)
            }
        });

        if (!userRole) {
            return res.status(404).json({ message: "User does not have this role" });
        }

        await userRole.destroy();

        return res.status(200).json({
            message: `Role ${role.name} removed from user ${user.username}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error Removing Role from User",
            error: error.message
        });
    }
});

module.exports = router;