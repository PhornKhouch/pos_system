const { Category } = require('../models');
const logError = require('../utils/logger');

// GET all categories or get by ID
const get = async (req, res) => {
    try {
        const { code  } = req.query;
        
        if (code) {
            // Get specific category by code
            const data = await Category.findByPk(code);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            return res.json({
                success: true,
                data: data
            });
        }
        
        // Get all categories
        const data = await Category.findAll();
        res.json({
            success: true,
            data: data
        });
    }
    catch (error) {
        logError("CategoryController - get", error, res);
    }
};

// SEARCH categories by code or description
const search = async (req, res) => {
    try {
        const { keyword  } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Search keyword is required'
            });
        }

        const { Op } = require('sequelize');
        const data = await Category.findAll({
            where: {
                [Op.or]: [
                    { code: { [Op.like]: `%${keyword}%` } },
                    { desc: { [Op.like]: `%${keyword}%` } },
                    { remark: { [Op.like]: `%${keyword}%` } }
                ]
            }
        });

        res.json({
            success: true,
            data: data,
            count: data.length
        });
    }
    catch (error) {
        logError("CategoryController - search", error, res);
    }
};

// CREATE a new category
const create = async (req, res) => {
    try {
        const { code, desc, remark } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Category code is required'
            });
        }

        // Check if category already exists
        const existing = await Category.findByPk(code);
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Category with this code already exists'
            });
        }

        const data = await Category.create({
            code,
            desc: desc || null,
            remark: remark || null
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: data
        });
    }
    catch (error) {
        logError("CategoryController", error, res);
    }
};

// UPDATE a category
const update = async (req, res) => {
    try {
        const { code, desc, remark } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Category code is required'
            });
        }

        // Check if category exists
        const category = await Category.findByPk(code);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Update category
        await category.update({
            desc: desc !== undefined ? desc : category.desc,
            remark: remark !== undefined ? remark : category.remark
        });

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });
    }
    catch (error) {
        logError("CategoryController", error, res);
    }
};

// DELETE a category
const deleteCategory = async (req, res) => {
    try {
        const { code } = req.params;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Category code is required'
            });
        }

        // Check if category exists
        const category = await Category.findByPk(code);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Delete category
        await category.destroy();

        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        logError("CategoryController", error, res);
    }
};

module.exports = {
    get,
    search,
    create,
    update,
    deleteCategory
}