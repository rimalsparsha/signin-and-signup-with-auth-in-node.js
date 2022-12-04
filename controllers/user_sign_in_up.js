const sign_in_up_Model = require('../models/user_sign_in_up');
const bcrypt = require('bcrypt');



class sign_in_up_Controller{


//Register Function Start
      static userRegister = async (req,res) =>{


        //Getting data from body
        const {name, email, phone, password, confirmpassword} = req.body
        

        //check the exist email
        const user = await sign_in_up_Model.findOne({email:email});

        if(user){

          res.render('register',{

            message: "Email already exists"

          });

        }

        else{

          //check the data is empty or not
          if(name && email && phone && password && confirmpassword){


            //check the password and confirm password
              if(password === confirmpassword){

                try {

                  //Password Hash
                  const salt = await bcrypt.genSalt(10);
                  const hashPassword = await bcrypt.hash(password, salt);

                  const doc = new sign_in_up_Model({

                      name:name,
                      email:email,
                      phone:phone,  
                      password:hashPassword,
                      is_admin: 0

                  });

                  //Generate Token
                  const token = await doc.generateAuthToken();
                  //console.log("register token: " + token);

/*                   //store in cookie
                  res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000),
                    httpOnly: true
                  }); */

                  await doc.save();

                  if(doc){

                    res.redirect('/login');

                  }
                  
                }
                catch(error){
                  console.log(error);
                }

              }

              else{

                res.render('register',
                {
                    message: "Password doesn't match!"
                });

              };

          }
          
          else{

            res.render('register',
            {
                message: "All field are should be required!"
            });

          };

        };

      }



//Regstration Function Stop


//Login Function Start

static userLogin = async (req, res) =>{

  try {
    
    //getting the data
    const {email, password} = req.body;

    if(email, password){

      //check register email
      const user = await sign_in_up_Model.findOne({email:email})
      if(user != null){

        //Check the password match
        const passwordMatch = await bcrypt.compare (password, user.password)


        //Generate Token
        const token = await user.generateAuthToken();
        //console.log("login token: " + token);

        //store in cookie
        res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
        //secure: true
        });
        
        
        //check email and password
        if((user.email = email) && (user.is_admin == 0) && passwordMatch){

          res.redirect('/');

        }
        else{

          res.render('login',
          {
            message: "Email or Password is incorrect!"
          });

        }

      }
      else{

        res.render('login',
        {
          message: "Email is not register!"
        });

      }

    }
    else{

      res.render('login',
      {
        message: "All field should be required!"
      });

    }

  }
  catch(error){
    
    res.render('login',
    {
        message: "Unable to login!"
    })

  }

}

//Login Function Stop


};


module.exports = sign_in_up_Controller;