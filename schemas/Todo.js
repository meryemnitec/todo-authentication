const mongoose=require(`mongoose`);

const TodoSchema=mongoose.Schema({
    name:{
        type:String,
        min: 5,
        max:50,
        required: true,
    },
    description:{
       type:String,
       min:5,
       max:150, 
       default:"Todo",
    },
},
{
    timestamps: true,
    versionKey:false,
}

);
module.exports=mongoose.model("todo",TodoSchema);
