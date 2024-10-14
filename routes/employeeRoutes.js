const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
});

// Create new employee
router.post('/employees', [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('position').notEmpty(),
    body('salary').isNumeric(),
    body('date_of_joining').isISO8601(),
    body('department').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }
    res.status(200).json(employee);
});

// Update employee
router.put('/employees/:eid', async (req, res) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee details updated successfully.' });
});

// Delete employee
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    const deletedEmployee = await Employee.findByIdAndDelete(eid);
    if (!deletedEmployee) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }
    res.status(204).json({ message: 'Employee deleted successfully.' });
});

module.exports = router;
