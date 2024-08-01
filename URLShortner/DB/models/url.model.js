// import mongoose, { Schema } from "mongoose"
// import shortid from "shortid"

// export const urlSchema=new Schema({

//     shortId:{
//         type:String,
//         required:true,
//         unique:true,
//         default:shortid.generate
//     },

//     originalUrl:{
//         type:String,
//         required:true
//     },

// },{
//     timestamps:true
// })

// const urlModel=mongoose.model("URL",urlSchema)


// export default urlModel


import mongoose from 'mongoose';
import shortid from 'shortid';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
});

const UrlModel = mongoose.model('Url', urlSchema);
export default UrlModel;
