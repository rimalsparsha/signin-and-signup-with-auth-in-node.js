const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const sign_in_up_Schema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
        require: true,
        trim: false,
    },
    phone:{
        type: Number,
        require: true,
        trim: false
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    date:{
        type: Date,
        require: true,
        default: Date.now
    },
    is_admin:{
        type: Number,
        require: true
    },
    tokens:[{
        token:{
            type: String,
            require: true,
        }
    }]

})


//Generate token
sign_in_up_Schema.methods.generateAuthToken = async function(){

    try {
        
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    }
    catch(error){
        
        console.log(error);

    }

}

const sign_in_up_Model = mongoose.model("sign_in_up",sign_in_up_Schema);

module.exports = sign_in_up_Model;