const sign_in_up_Model = require('../models/user_sign_in_up');
const bcrypt = require('bcrypt');



class admin_login_logout_Controller{


//Admin Login Function start
static adminLogin = async (req, res) =>{

    try {

        //getting the data
        const {email, password} = req.body

        if(email && password){

         //check the register email
        const user = await sign_in_up_Model.findOne({email:email})
        if(user != null){

        // check the password match
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){

            if(user.is_admin === 1){

                //Generate Token
                const token = await user.generateAuthToken();
                //console.log("login token: " + token);

                //store in cookie
                res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true,
                //secure: true
                });


            res.redirect('\admin')

            }
            else{

                res.render('adminLogin',
                {
                    message: "Email or Password is incorrect!"
                })
                
            }
        }
        else{

            res.render('adminLogin',
            {
                message: "Email or Password is incorrect!"
            })

        }

        }
        else{

            res.render('adminLogin',
            {
                message: "Email isnot registered!"
            })

        }
        }
        else{

            res.render('adminLogin',
            {
                message: "All field are should be required!"
            })
        }

}
            catch (error)
            {
            res.render('adminLogin',
            {
            message: "Unable to login!"
            })
            }


}


//Logout Function Start
static adminLogout = async (req, res) =>{

        try {
    
         // console.log(req.user);
    
          //logout from 1 device
    /*       req.user.tokens = req.user.tokens.filter((currElement) =>{
            return currElement.token !== req.token
          }) */
    
          //logout from all device
          req.user.tokens = [];
    
         res.clearCookie("jwt");
    
          //console.log("logout");
          await req.user.save();
          res.redirect('/adminLogin')
    
        }
        catch(error) {
          
          console.log(error);
    
        }
    
    }
    
    //Logout Function Stop

}

module.exports = admin_login_logout_Controller;