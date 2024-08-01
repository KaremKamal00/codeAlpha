import mongoose, { Schema } from "mongoose";


export const userSchema=new Schema({

   name:{
        type:String,
        required:true
   },
   email:{
        type:String,
        required:true,
        unique:true
   },
   password:{
     type:String,
     required:true
   },
   role:{
     type:String,
     enum:['Admin','User'],
     default:'User'
 },
},{
    timestamps:true
})

const userModel=mongoose.model("User",userSchema)


export default userModel