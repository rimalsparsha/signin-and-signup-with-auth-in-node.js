const express = require('express');
const logout_forgot_router = express.Router();


//import controller
 const logout_forgot_Controller = require('../controllers/user_logout_forgot');

 //auth
 const auth = require('../middleware/auth');




 //logout
logout_forgot_router.get('/logout', auth, logout_forgot_Controller.userLogout);


//forgot
logout_forgot_router.get('/forgot', (req, res) =>{
    res.render('forgot');
});
logout_forgot_router.post('/forgot', logout_forgot_Controller.forgot_password);


//reset
logout_forgot_router.get('/reset/:id/:token', (req, res)=>{
    res.render('reset');
})

logout_forgot_router.post('/reset', logout_forgot_Controller.reset_password);




module.exports = logout_forgot_router;