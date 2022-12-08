const express= require('express');
const mongoose= require('mongoose');
const todo=require('./schemas/Todo');
require(`dotenv/config`);



const PORT=process.env.PORT || 3000;
const app=express();

app.use(express.json());

const todoRoutes=require("./routes/todo");
const userRoutes=require("./routes/user");

app.use("/todos",todoRoutes);
app.use("/users",userRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
},
()=>console.log('Mongo DB Connected'));

app.listen(3000,()=>

console.log(`Listening Port On ${PORT}`));
console.log("new file");
