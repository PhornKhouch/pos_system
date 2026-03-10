const Customer = require('../models/Customer');
const logError = require('../utils/logger');
const bcrypt = require('bcrypt');
const { IsValid } = require('../utils/prevent');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

// Generate unique customer ID
const generateCustomerId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `CUS${timestamp}${random}`.toUpperCase();
};

// Register new customer
const register = async (req, res) => {
    try {
        const { fullname, gmail, phone, password } = req.body;

        // Validate required fields
        if (IsValid(fullname) || IsValid(gmail) || IsValid(password)) {
            return res.status(400).json({
                success: false,
                message: 'Full name, email and password are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(gmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Check if email already exists
        const existingCustomer = await Customer.findOne({ where: { gmail: gmail } });
        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Check if phone already exists (if provided)
        if (phone) {
            const existingPhone = await Customer.findOne({ where: { phone: phone } });
            if (existingPhone) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number already registered'
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new customer
        const newCustomer = await Customer.create({
            customer_id: generateCustomerId(),
            fullname,
            gmail,
            phone: phone || null,
            password: hashedPassword,
            photo: 'default.png',
            created_by: 'self-register',
            changed_on: new Date()
        });

        // Generate token
        const token = jwt.sign(
            { customer_id: newCustomer.customer_id, gmail: newCustomer.gmail },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                customer_id: newCustomer.customer_id,
                fullname: newCustomer.fullname,
                gmail: newCustomer.gmail,
                phone: newCustomer.phone,
                photo: newCustomer.photo
            },
            token: token
        });
    } catch (error) {
        logError("CustomerController - register", error, res);
    }
};

// Login customer
const login = async (req, res) => {
    try {
        const { gmail, password } = req.body;

        // Validate required fields
        if (IsValid(gmail) || IsValid(password)) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find customer by email
        const customer = await Customer.findOne({ where: { gmail: gmail } });
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, customer.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { customer_id: customer.customer_id, gmail: customer.gmail },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                customer_id: customer.customer_id,
                fullname: customer.fullname,
                gmail: customer.gmail,
                phone: customer.phone,
                photo: customer.photo
            },
            token: token
        });
    } catch (error) {
        logError("CustomerController - login", error, res);
    }
};

// Get all customers
const get = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({
            success: true,
            data: customers
        });
    } catch (error) {
        logError("CustomerController - get", error, res);
    }
};

// Get one customer by ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (IsValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID is required'
            });
        }

        const customer = await Customer.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        logError("CustomerController - getOne", error, res);
    }
};

// Search customers
const search = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (IsValid(keyword)) {
            return res.status(400).json({
                success: false,
                message: 'Search keyword is required'
            });
        }

        const customers = await Customer.findAll({
            where: {
                [Op.or]: [
                    { fullname: { [Op.like]: `%${keyword}%` } },
                    { gmail: { [Op.like]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } }
                ]
            },
            attributes: { exclude: ['password'] }
        });

        res.json({
            success: true,
            data: customers
        });
    } catch (error) {
        logError("CustomerController - search", error, res);
    }
};

// Update customer profile
const update = async (req, res) => {
    try {
        const { customer_id, fullname, gmail, phone, photo } = req.body;

        if (IsValid(customer_id)) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID is required'
            });
        }

        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        // Check if new email already exists (if changing email)
        if (gmail && gmail !== customer.gmail) {
            const existingEmail = await Customer.findOne({ where: { gmail: gmail } });
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
        }

        // Check if new phone already exists (if changing phone)
        if (phone && phone !== customer.phone) {
            const existingPhone = await Customer.findOne({ where: { phone: phone } });
            if (existingPhone) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number already in use'
                });
            }
        }

        await customer.update({
            fullname: fullname || customer.fullname,
            gmail: gmail || customer.gmail,
            phone: phone || customer.phone,
            photo: photo || customer.photo,
            changed_on: new Date()
        });

        res.json({
            success: true,
            message: 'Customer updated successfully',
            data: {
                customer_id: customer.customer_id,
                fullname: customer.fullname,
                gmail: customer.gmail,
                phone: customer.phone,
                photo: customer.photo
            }
        });
    } catch (error) {
        logError("CustomerController - update", error, res);
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        const { customer_id, old_password, new_password } = req.body;

        if (IsValid(customer_id) || IsValid(old_password) || IsValid(new_password)) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID, old password and new password are required'
            });
        }

        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        // Verify old password
        const isValidPassword = await bcrypt.compare(old_password, customer.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await customer.update({
            password: hashedPassword,
            changed_on: new Date()
        });

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        logError("CustomerController - changePassword", error, res);
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        if (IsValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID is required'
            });
        }

        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        await customer.destroy();

        res.json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        logError("CustomerController - deleteCustomer", error, res);
    }
};

// Get customer profile (for authenticated customer)
const getProfile = async (req, res) => {
    try {
        // customer_id comes from JWT middleware
        const { customer_id } = req.user || req.body;

        if (IsValid(customer_id)) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID is required'
            });
        }

        const customer = await Customer.findByPk(customer_id, {
            attributes: { exclude: ['password'] }
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        logError("CustomerController - getProfile", error, res);
    }
};

module.exports = {
    register,
    login,
    get,
    getOne,
    search,
    update,
    changePassword,
    deleteCustomer,
    getProfile
};
