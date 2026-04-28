const { get, search, create, update, deleteProduct, getDetail, createDetail, updateDetail, deleteDetail } = require('../controllers/productController');
const { uploadPhoto } = require('../middleware/upload');
const Product = (app) => {
    app.get('/api/product', get);
    app.get('/api/product/search', search);
    app.post('/api/product', uploadPhoto, create);
    app.put('/api/product', uploadPhoto, update);
    app.delete('/api/product/:prd_id', deleteProduct);

    // Product detail (specs) routes
    app.get('/api/product/detail/:prd_id', getDetail);
    app.post('/api/product/detail/:prd_id', createDetail);
    app.put('/api/product/detail/:detail_id', updateDetail);
    app.delete('/api/product/detail/:detail_id', deleteDetail);
};

module.exports = Product;
