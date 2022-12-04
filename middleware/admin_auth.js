const jwt = require('jsonwebtoken');
const sign_in_up_Model = require('../models/user_sign_in_up');



const admin_auth = async (req, res, next) =>{

    try {
        
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
        //console.log(verifyuser);
        
        const user = await sign_in_up_Model.findOne({_id:verifyuser._id});
        //console.log(user.name);

        req.token = token;
        req.user = user;

        next();

    }
    catch(error){
        
        res.render('adminLogin',
        {
            message: "Login at first!"
        })

    }

}


module.exports = admin_auth;