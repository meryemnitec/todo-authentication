const express=require('express');
const verifiyToken = require('../middlewares/verifiyToken');
const Todo = require('../schemas/Todo');
const router=express.Router();


router.get("/",verifiyToken, async (req,res)=>{
   const todos= await Todo.find();
res.json({
    message:"Todolar Getirildi",
    status:200,
    data:{todos},
}).status(200);
});

router.get('/:id',verifiyToken, async(req,res)=>{
    const todoId =req.params.id;
    const todo= await Todo.findById(todoId);
    res.json({ message: 'Todo Getirildi',status: 200,data:{todo}})
});

router.post ('/create',verifiyToken, async (req,res)=>{
 const createdTodo= await(await Todo.create(req.body)).save();
res.json(createdTodo);
res.json({ message: 'Todo Oluşturuldu',status: 200,data:{createdTodo}})
});

router.patch("/update/:id",verifiyToken, async(req,res)=>{
const todoId =req.params.id;
 const updatedTodo = await Todo.findByIdAndUpdate(todoId,req.body,{
    new:true,
 });
 res.json({ message: 'Todo basarıyla guncellendi',status: 200,data:{updatedTodo}})
});

router.delete('/delete/:id',verifiyToken, async(req,res)=>{
    const todoId=req.params.id;
    const deletedTodo=await Todo.findByIdAndDelete(todoId);
    res.json({ message: 'Todo başarıyla Silindi',status: 200,data:{deletedTodo}})
})

module.exports=router;
