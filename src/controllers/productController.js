const { MasterProduct, ProductDetail } = require('../models');
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
        logError("ProductController", error, res);
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
            photo: req.file ? uploadedPhoto : product.photo
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
    deleteProduct,
    getDetail,
    createDetail,
    updateDetail,
    deleteDetail
}

// GET product details (specs) by prd_id
async function getDetail(req, res) {
    try {
        const { prd_id } = req.params;

        const product = await MasterProduct.findByPk(prd_id, {
            include: [{ model: ProductDetail, as: 'ProductDetails' }]
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const details = (product.ProductDetails || []).map(d => ({
            detail_id: d.detail_id,
            long_des: d.long_des,
            color: d.color,
            spec: d.spec
        }));

        res.json({
            success: true,
            data: {
                prd_id: product.prd_id,
                prd_name: product.prd_name,
                category_id: product.category_id,
                brand_id: product.brand_id,
                photo: product.photo,
                status: product.status,
                details
            }
        });
    } catch (error) {
        logError('ProductController - getDetail', error, res);
    }
}

// CREATE product detail spec row(s)
// Body: { prd_id, details: [{ section, spec_key, spec_value, sort_order }] }
async function createDetail(req, res) {
    try {
        const { prd_id } = req.params;
        const { details } = req.body;

        if (!Array.isArray(details) || details.length === 0) {
            return res.status(400).json({ success: false, message: 'details array is required' });
        }

        const product = await MasterProduct.findByPk(prd_id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const rows = details.map(d => ({
            prd_id,
            long_des: d.long_des || null,
            color: d.color || null,
            spec: d.spec || null
        }));

        const created = await ProductDetail.bulkCreate(rows);

        res.status(201).json({ success: true, message: 'Product details created', data: created });
    } catch (error) {
        logError('ProductController - createDetail', error, res);
    }
}

// UPDATE a single product detail row
// Body: { spec_key, spec_value, section, sort_order }
async function updateDetail(req, res) {
    try {
        const { detail_id } = req.params;
        const { long_des, color, spec } = req.body;

        const detail = await ProductDetail.findByPk(detail_id);
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Detail not found' });
        }

        await detail.update({
            long_des: long_des !== undefined ? long_des : detail.long_des,
            color: color !== undefined ? color : detail.color,
            spec: spec !== undefined ? spec : detail.spec
        });

        res.json({ success: true, message: 'Product detail updated', data: detail });
    } catch (error) {
        logError('ProductController - updateDetail', error, res);
    }
}

// DELETE a single product detail row by detail_id
async function deleteDetail(req, res) {
    try {
        const { detail_id } = req.params;

        const detail = await ProductDetail.findByPk(detail_id);
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Detail not found' });
        }

        await detail.destroy();
        res.json({ success: true, message: 'Product detail deleted' });
    } catch (error) {
        logError('ProductController - deleteDetail', error, res);
    }
}