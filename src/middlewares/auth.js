export function validateToken(req,res,next){
    const headers = req.headers['authorization'];
    if (headers){
        req.token = headers.split(" ")[1];
        next();
    }else{
        return res.status(403).json({
            message:"Error, invalid token" 
        });
    }
}