const { get, search, create, update, deleteBrand } = require('../controllers/brandController');
const { uploadPhoto } = require('../middleware/upload');

const Brand = (app) => {
    app.get('/api/brand', get);
    app.get('/api/brand/search', search);
    app.post('/api/brand', uploadPhoto, create);
    app.put('/api/brand/:code', uploadPhoto, update);
    app.delete('/api/brand/:code', deleteBrand);
};

module.exports = Brand;
