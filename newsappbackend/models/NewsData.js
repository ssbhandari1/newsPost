const mongoose = require("mongoose");
const NewsSchema=new mongoose.Schema({
    content:{type:String,required:true,},
    publishedAt:{type:String,required:true,},
    title:{type:String,required:true,},
    urlToImage:{type:String,required:true,},
    // userOwner:{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'users',
    //    required:true
    // }
   })
   
   exports.NewsModel=mongoose.model('newsData',NewsSchema)