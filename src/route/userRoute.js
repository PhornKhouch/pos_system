
var {GetUser,Create ,GetOne ,login , Update ,Delete ,sendOTP, verifyOtp, resetPassword} = require('../controllers/userController');
var {validate_token} = require('../middleware/auth');
// var auth = require('../auth/middleware');
const Users = (app)=>{
        
    app.get('/api/user' ,validate_token(), GetUser);
    app.get('/api/user/:id' ,validate_token(), GetOne);
    app.post('/api/user' , Create);
    app.put('/api/user' ,validate_token(), Update);
    app.post('/api/user/login' ,login);
    app.post('/api/user/sendOTP' ,sendOTP);
    app.post('/api/user/verifyOTP' ,verifyOtp);
    app.post('/api/user/resetPassword' ,resetPassword);
    app.delete('/api/user/:id' ,validate_token(), Delete);

}



module.exports = Users ;
