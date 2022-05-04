const jwt = require('jsonwebtoken')
const { User } = require('../models/usersModels')
function CheckUserAuthentication(req, res, next){
    try{
        if(req.headers['authorization']){
            
            const token = req.headers['authorization']
            const user_id = jwt.decode(token, 'hht677ft')._id
            const user = User.findById(user_id)
            req.user = user
            // req.username = user
            req.isAuthenticated = true
        }else{
            req.user = null
            req.IsAuthenticated = false
        }
    }
    catch(err){
        console.log(err)
    }
    next()
}
module.exports = CheckUserAuthentication