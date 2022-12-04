const express = require('express');
const admin_login_logout_router = express.Router();


//import controller
 const admin_login_logout_Controller = require('../controllers/admin_login_logout');

 //auth
 const admin_auth = require('../middleware/admin_auth');



 //login
 admin_login_logout_router.get('/adminLogin',(req,res)=>{
    res.render('adminLogin');
});

admin_login_logout_router.post('/adminLogin',admin_login_logout_Controller.adminLogin);



//logout
admin_login_logout_router.get('/adminLogout', admin_auth, admin_login_logout_Controller.adminLogout);



//admin page
admin_login_logout_router.get('/admin', admin_auth,(req, res,) =>{
    res.render('admin');
});



 module.exports = admin_login_logout_router;