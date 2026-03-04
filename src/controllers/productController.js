const { MasterProduct } = require('../models');
const logError = require('../utils/logger');

const buildPhotoPath = (req, file) => {
    if (!file) {
        return null;
    }
    return `assets/upload/${file.filename}`;
};
// GET all products or get by ID
const get = async (req, res) => {
    try {
        const { prd_id } = req.query;
        
        if (prd_id) {
            // Get specific product by prd_id
            const data = await MasterProduct.findByPk(prd_id);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            return res.json({
                success: true,
                data: data
            });
        }
        
        // Get all products
        const data = await MasterProduct.findAll();
        res.json({
            success: true,
            data: data
        });
    }
    catch (error) {
        logError("ProductController", error, res);
    }
};

// SEARCH products by name, category, or brand
const search = async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Search keyword is required'
            });
        }

        const { Op } = require('sequelize');
        const data = await MasterProduct.findAll({
            where: {
                [Op.or]: [
                    { prd_id: { [Op.like]: `%${keyword}%` } },
                    { prd_name: { [Op.like]: `%${keyword}%` } },
                    { category_id: { [Op.like]: `%${keyword}%` } },
                    { brand_id: { [Op.like]: `%${keyword}%` } }
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
        logError("ProductController - search", error, res);
    }
};

// CREATE a new product
const create = async (req, res) => {
    try {
        const { prd_id, prd_name, category_id, brand_id, stock_date, exp_date, qty, unit_cost, telegram, status, remark, photo } = req.body;
        const uploadedPhoto = buildPhotoPath(req, req.file);
        if (!prd_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        if (!prd_name) {
            return res.status(400).json({
                success: false,
                message: 'Product name is required'
            });
        }

        // Check if product already exists
        const existing = await MasterProduct.findByPk(prd_id);
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Product with this ID already exists'
            });
        }

        const data = await MasterProduct.create({
            prd_id,
            prd_name,
            category_id: category_id || null,
            brand_id: brand_id || null,
            stock_date: stock_date || null,
            exp_date: exp_date || null,
            qty: qty || 0,
            unit_cost: unit_cost || 0,
            telegram: telegram || null,
            status: status || 'available',
            remark: remark || null,
            photo: uploadedPhoto || null
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: data
        });
    }
    catch (error) {
        logError("ProductControlle", error, res);
    }
};

// UPDATE a product
const update = async (req, res) => {
    try {
        const { prd_id, prd_name, category_id, brand_id, stock_date, exp_date, qty, unit_cost, telegram, status, remark, photo } = req.body;
        const uploadedPhoto = buildPhotoPath(req, req.file);

        if (!prd_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists
        const product = await MasterProduct.findByPk(prd_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Update product
        await product.update({
            prd_name: prd_name !== undefined ? prd_name : product.prd_name,
            category_id: category_id !== undefined ? category_id : product.category_id,
            brand_id: brand_id !== undefined ? brand_id : product.brand_id,
            stock_date: stock_date !== undefined ? stock_date : product.stock_date,
            exp_date: exp_date !== undefined ? exp_date : product.exp_date,
            qty: qty !== undefined ? qty : product.qty,
            unit_cost: unit_cost !== undefined ? unit_cost : product.unit_cost,
            telegram: telegram !== undefined ? telegram : product.telegram,
            status: status !== undefined ? status : product.status,
            remark: remark !== undefined ? remark : product.remark,
            photo: uploadedPhoto !== undefined ? uploadedPhoto : product.photo
        });

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    }
    catch (error) {
        logError("ProductController", error, res);
    }
};

// DELETE a product
const deleteProduct = async (req, res) => {
    try {
        const { prd_id } = req.params;

        if (!prd_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists
        const product = await MasterProduct.findByPk(prd_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete product
        await product.destroy();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    }
    catch (error) {
        logError("ProductController - delete", error, res);
    }
};

module.exports = {
    get,
    search,
    create,
    update,
    deleteProduct
}