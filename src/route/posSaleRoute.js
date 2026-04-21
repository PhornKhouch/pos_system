
var {saleItem} = require('../controllers/poSsaleController');
var {generateKHQR, verifyKHQR, checkPaymentStatus} = require('../controllers/khqrController');
var {validate_token} = require('../middleware/auth');
// var auth = require('../auth/middleware');
const Sale = (app)=>{
        
    //app.get('/api/sale' , getSale);
    app.post('/api/sale' , saleItem);

    // Bakong KHQR endpoints
    app.post('/api/khqr/generate' , generateKHQR);        // Generate KHQR QR string
    app.post('/api/khqr/verify' , verifyKHQR);            // Verify KHQR string
    app.post('/api/khqr/check-payment' , checkPaymentStatus); // Check payment status via Bakong API

    // app.post('/api/user' ,validate_token(), Create);
    // app.put('/api/user' ,validate_token(), Update);
    // app.post('/api/user/login' ,login);
    // app.post('/api/user/sendOTP' ,sendOTP);
    // app.post('/api/user/verifyOTP' ,verifyOtp);
    // app.post('/api/user/resetPassword' ,resetPassword);
    // app.delete('/api/user/:id' ,validate_token(), Delete);

}


module.exports = Sale ;