const express = require('express');

const {Permission, Role, RolePermission} = require('../../db/models')

const router = express.Router();

//Get All Permissions
router.get('/', async (req, res) => {
    try {
        const permissions = await Permission.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        return res.json(permissions);
    } catch (error) {
        return res.status(500).json({
            message: "Error Retrieving Permissions",
            error: error.message
        });
    }
});

//Get a Permission by Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const permission = await Permission.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        return res.json(permission);
    } catch (error) {
        return res.status(500).json({
            message: "Error Retrieving Permission",
            error: error.message
        });
    }
});

//Create Permission
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const newPermission = await Permission.create({
            name,
            description
        });

        return res.status(201).json(newPermission);
    } catch (error) {
        return res.status(500).json({
            message: "Error Creating Permission",
            error: error.message
        });
    }
});

//Add a Permission to a Role
router.post('/:permissionId/roles/:roleId', async (req, res) => {
    const { roleId, permissionId } = req.params;

    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        const rolePermission = await RolePermission.create({
            roleId: parseInt(roleId),
            permissionId: parseInt(permissionId)
        });

        return res.status(201).json({
            message: `Permission ${permission.name} added to role ${role.name}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error Adding Permission to Role",
            error: error.message
        });
    }
});

//Remove a Permission from a Role
router.delete('/:permissionId/roles/:roleId', async (req, res) => {
    const { roleId, permissionId } = req.params;

    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        const rolePermission = await RolePermission.findOne({
            where: {
                roleId: parseInt(roleId),
                permissionId: parseInt(permissionId)
            }
        });

        if (!rolePermission) {
            return res.status(404).json({ message: "Role does not have this permission" });
        }

        await rolePermission.destroy();

        return res.status(200).json({
            message: `Permission ${permission.name} removed from role ${role.name}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error Removing Permission from Role",
            error: error.message
        });
    }
});

module.exports = router;