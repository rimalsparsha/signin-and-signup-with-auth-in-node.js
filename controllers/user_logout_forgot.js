const sign_in_up_Model = require('../models/user_sign_in_up');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class logout_forgot_Controller{

    //Logout Function Start
    static userLogout = async (req, res) =>{

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
      res.redirect('/login')

    }
    catch(error) {
      
      console.log(error);

    }

}

//Logout Function Stop


//Forgot Function Start
static forgot_password = async (req, res) =>{

  //check the email
  const {email} = req.body;
  if(email){

    //getting the email
    const user = await sign_in_up_Model.findOne({email:email});
    if(user){

      const secret = user._id + process.env.SECRET_KEY;
      const token = jwt.sign({userID: user._id}, secret, { expiresIn: '5m'});
      const link = `http://127.0.0.1:3000/reset/${user._id}/${token}`
      console.log(link);

      res.render('forgot',
      {
        message : "Check your email!"
      })

    }
    else{
      res.render('forgot',{
  
        message: "Email is not register!"
  
      });
    }

  }
  else{
    res.render('forgot',{

      message: "Email is required!"

    });
  }

}


//Reset Password Function Start
static reset_password = async (req, res) =>{

  const{password, confirmpassword} = req.body;
  const {id, token} = req.params
  const user = await sign_in_up_Model.findById(id);
  const newSecret = user._id + process.env.SECRET_KEY;


  try {
    
   jwt.verify(token, newSecret);
    if(password && confirmpassword){

      if(password === confirmpassword){

        //Password Hash
        const salt = await bcrypt.genSalt(10);
        const newhashPassword = await bcrypt.hash(password, salt);

        await sign_in_up_Model.findByIdAndUpdate(req.user._id,{ $set: {password: newhashPassword}});
        res.send({"message": "sucess!"})

      }
      else{
        res.render('reset',{

          message: "Password does not Match!"
    
        });
      }

    }
    else{
      res.render('reset',{

        message: "All fields are required!"
  
      });
    }

  }
  catch(error) {
    
    console.log(error);

  }

}


}


module.exports = logout_forgot_Controller;