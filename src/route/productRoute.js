const { get, search, create, update, deleteProduct } = require('../controllers/productController');
const { uploadPhoto } = require('../middleware/upload');
const Product = (app) => {
    app.get('/api/product', get);
    app.get('/api/product/search', search);
    app.post('/api/product', uploadPhoto, create);
    app.put('/api/product', uploadPhoto, update);
    app.delete('/api/product/:prd_id', deleteProduct);
};

module.exports = Product;
