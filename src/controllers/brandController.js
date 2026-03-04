const { Brand } = require('../models');
const logError = require('../utils/logger');

const buildPhotoPath = (req, file) => {
    if (!file) {
        return null;
    }
    return `assets/upload/${file.filename}`;
};

// GET all brands or get by ID
const get = async (req, res) => {
    try {
        const { code,category } = req.query;
        
        if (code) {
            // Get specific brand by code
            const data = await Brand.findByPk(code);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Brand not found'
                });
            }
            

            return res.json({
                success: true,
                data: data
            });
        }
        //filter by category_id if provided
        if(category){
            const { Op } = require('sequelize');
            const result = await Brand.findAll({
                where: {
                    [Op.or]: [
                        { category_id: { [Op.like]: `%${category}%` } }
                    ]
                }
            });
            if(result.length === 0){
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            return res.json({
                success: true,
                data: result
            });
        }
        
        
        // Get all brands
        const data = await Brand.findAll();
        res.json({
            success: true,
            data: data
        });
    }
    catch (error) {
        logError("BrandController - get", error, res);
    }
};

// SEARCH brands by code or description
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
        const data = await Brand.findAll({
            where: {
                [Op.or]: [
                    { code: { [Op.like]: `%${keyword}%` } },
                    { desc: { [Op.like]: `%${keyword}%` } },
                    { category_id: { [Op.like]: `${keyword}%` } }
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
        logError("BrandController - search", error, res);
    }
};

// CREATE a new brand
const create = async (req, res) => {
    try {
        const { code, desc, category_id, remark, photo } = req.body;
        const uploadedPhoto = buildPhotoPath(req, req.file);

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Brand code is required'
            });
        }

        // Check if brand already exists
        const existing = await Brand.findByPk(code);
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Brand with this code already exists'
            });
        }

        const data = await Brand.create({
            code,
            desc: desc || null,
            category_id: category_id || null,
            remark: remark || null,
            photo: uploadedPhoto || photo || null
        });

        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
            data: data
        });
    }
    catch (error) {
        logError("BrandController - create", error, res);
    }
};

// UPDATE a brand
const update = async (req, res) => {
    try {
        const { code } = req.params;
        const { desc, category_id, remark, photo } = req.body;
        const uploadedPhoto = buildPhotoPath(req, req.file);

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Brand code is required'
            });
        }

        // Check if brand exists
        const brand = await Brand.findByPk(code);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            });
        }

        // Update brand
        await brand.update({
            desc: desc !== undefined ? desc : brand.desc,
            category_id: category_id !== undefined ? category_id : brand.category_id,
            remark: remark !== undefined ? remark : brand.remark,
            photo: uploadedPhoto || (photo !== undefined ? photo : brand.photo)
        });

        res.json({
            success: true,
            message: 'Brand updated successfully',
            data: brand
        });
    }
    catch (error) {
        logError("BrandController - update", error, res);
    }
};

// DELETE a brand
const deleteBrand = async (req, res) => {
    try {
        const { code } = req.params;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Brand code is required'
            });
        }

        // Check if brand exists
        const brand = await Brand.findByPk(code);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            });
        }

        // Delete brand
        await brand.destroy();

        res.json({
            success: true,
            message: 'Brand deleted successfully'
        });
    }
    catch (error) {
        logError("BrandController - delete", error, res);
    }
};

module.exports = {
    get,
    search,
    create,
    update,
    deleteBrand
}