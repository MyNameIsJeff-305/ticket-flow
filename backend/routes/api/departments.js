const express = require('express');

const { Department, User } = require('../../db/models');

const router = express.Router();

//Get All Departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.findAll();
        return res.json(departments);
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error Retrieving Departments",
                error: error.message
            });
    }
});

//Get a Department by Id and all the Employees associated to it
router.get('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        const dptEmployees = await User.findAll({
            where: {
                departmentId: department.id
            },
            attributes: { exclude: ['hashedPassword', 'departmentId', 'username', 'createdAt', 'updatedAt'] }
        });

        department.employees = dptEmployees;

        return res.json({ ...department.dataValues, employees: dptEmployees });

    } catch (error) {
        return res.status(500).json(
            {
                message: "Error Retrieving Department",
                error: error.message
            });
    }
});

//Create a Department
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and Description are required"
            });
        }

        const newDepartment = await Department.create({ name, description });
        return res.status(201).json(newDepartment);
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error Creating Department",
                error: error.message
            });
    }
});

//Edit a Department
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and Description are required"
            });
        }

        department.name = name;
        department.description = description;

        await department.save();

        return res.json(department);
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error Updating Department",
                error: error.message
            });
    }
});

// Delete a Department


module.exports = router;