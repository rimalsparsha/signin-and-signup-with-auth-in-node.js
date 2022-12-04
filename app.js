const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
var cookieParser = require('cookie-parser');



//for bodyParser i.e getting data from body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));





//Database
const connectDB = require('./database/DBconnection');
const DATABASE_URL = process.env.MONGODB;
connectDB(DATABASE_URL);



//Router

//user register and login router
const sign_in_up = require('./routes/user_sign_in_up');
app.use('/',sign_in_up);

//user logout and forgot router
const logout_forgot = require('./routes/user_logout_forgot');
app.use('/',logout_forgot);

//admin login and logout router
const admin_login_logout = require('./routes/adimin_login_logout');
app.use('/',admin_login_logout);


//user page router
const user_page_router = require('./routes/user_page');
app.use('/',user_page_router);


//ejs
app.set("view engine", "ejs");


//public
const {join} = require('path');
app.use(express.static(join(process.cwd(), "public")));


//port listener
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})