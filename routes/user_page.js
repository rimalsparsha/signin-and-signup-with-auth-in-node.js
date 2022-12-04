const express = require('express');
const user_page_router = express.Router();


user_page_router.get('/profile', (req, res,) =>{
    res.render('userProfile');
});



module.exports = user_page_router;