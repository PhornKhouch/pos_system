
var {getSale} = require('../controllers/saleController');
var {validate_token} = require('../middleware/auth');
// var auth = require('../auth/middleware');
const Sale = (app)=>{
        
    app.get('/api/sale' , getSale);
    // app.get('/api/user/:id' ,validate_token(), GetOne);
    // app.post('/api/user' ,validate_token(), Create);
    // app.put('/api/user' ,validate_token(), Update);
    // app.post('/api/user/login' ,login);
    // app.post('/api/user/sendOTP' ,sendOTP);
    // app.post('/api/user/verifyOTP' ,verifyOtp);
    // app.post('/api/user/resetPassword' ,resetPassword);
    // app.delete('/api/user/:id' ,validate_token(), Delete);

}


module.exports = Sale ;