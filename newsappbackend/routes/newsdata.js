const express = require("express");
const mongoose = require("mongoose");
const { NewsModel } = require("../models/NewsData");

const newsRouter = express.Router(); 

newsRouter.get('/',async(req,res)=>{
    try {
        const response=await NewsModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

newsRouter.post('/',async(req,res)=>{
   
    const {title}=req.body
    const ExistItem=await NewsModel.findOne({title:title})
    if (ExistItem) {
        return res.json({ message: "Item Already Saved" });
      }
    const newsdata=new NewsModel(req.body)
    try {
     const response=await newsdata.save()
     res.json(response)
    } catch (error) {
        res.json(error)
    }
})





module.exports = newsRouter;