// controllerımız routerlar
const express=require('express');
const User = require('../schemas/User');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');


router.post('/register', async(res,req,)=>{
try {
    const data =req.body;
if(!data.email && !data.password)
return res.json('Email ve sifre Bos Olamaz.').status(400);

const user= new User(data);

const salt= await bcrypt.genSalt(10); //şifreleme güvenliği için kullanılıyor hash ve salt 
user.password= await bcrypt.hash(user.password,salt);
const createdUser = await user.save();
res.json(createdUser);
} catch (error) {
    console.log(error);
}
});


router.post ('/Login',async (req,res,next)=>{
    try {
        const data=req.body;
        if (!data.email && !data.password)
        return res.json({message:'Email ve sifre bos olamaz',status:400}).status(400);

        const user = await User.findOne({ email:data.email});
        if(!user)
        return  res.json({message:'Kullanıcı Bulunamadı.',status:404}).status(404);
        const validPassword = await bcrypt.compare(data.password,user.password);
        console.log(validPassword);
        if(!validPassword){
           return next (res.json({ message:'Email ve Sifre Hatalı',status:400}).status(400));
        }
        const token =jwt.sign(

            { _id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn:'1h', //db kaydettiğimiz mail ve şifre bir saat içinde refresh olcak demek
            }

        );
        res.header('token',token);
            return  res.json({
              data:{  message: 'Kullanıcı Basarıyla Giris Yaptı', access_token:token}
            }).status(200);
        

    } catch (error) {
        res.json({
            message:error.message,
            status:500,
        }).status(200);
    }
})




module.exports= router;
