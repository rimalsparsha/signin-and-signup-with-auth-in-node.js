class auth{

    static isLogin = async(req, res, next) =>{
    
        try {
            
            if(req.session.user_id){}
            else{
                res.redirect('/login')
            }
            next()
    
        }
        catch (error) {
            console.log(error.message)
        }
    
    }
    
    
    
    static isLogout = async(req, res, next) =>{
    
        try {
            
            if(req.session.user_id){
                res.redirect('/')
            }
            next()
    
        }
        catch (error) {
            console.log(error.message)
        }
    
    }
    }
    
    
    export default auth