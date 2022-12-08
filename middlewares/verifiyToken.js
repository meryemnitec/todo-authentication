const jwt =require('jsonwebtoken');
const User=require('../schemas/User');



module.exports= async function(req,res,next){
    const token = req.header('token');
    if(!token)
    return next (
        res
        .json({message:'Erişim Engellendi !',status:403})
        .status(403)
    );
    try {
        const verifiedToken =jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        req.user=verifiedToken;
        if(!verifiedToken){
            res.json({message:'Erişim Engellendi !',status:403}).status(
                403
            );
        }
        return next();

    } catch (error) {
        res.json({
            message:error.message,
            status:500,
        }).status(500);
    }
};
