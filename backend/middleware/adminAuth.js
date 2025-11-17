import  jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) =>{
    try{
        const {token} = req.headers;
        // console.log("token: ",token);
        if(!token) return res.json({success: false, message:'Not authorized, please login'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decoded.id;


        // console.log("decoded: ", decoded);
        // console.log(process.env.ADMIN_PASSWORD);
        // console.log("decoded: ", process.env.ADMIN_EMAIL+process.env.ADMIN_PASSSWORD);
         
        if(decoded != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success: false, message:'Not authorized, please login'});
        }

        next();

    }catch(err){
        console.log(err);
        return res.json({success: false, message: err.message});
        // return res.json({success: false, message: "some error"});

    }
}

export default adminAuth;