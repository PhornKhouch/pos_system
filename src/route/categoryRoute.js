const { get, search, create, update, deleteCategory } = require('../controllers/categoryController');

const Category = (app) => {
    app.get('/api/category', get);
    app.get('/api/category/search', search);
    app.post('/api/category', create);
    app.put('/api/category', update);
    app.delete('/api/category/:code', deleteCategory);
};

module.exports = Category;