import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 

export const fetchNewsData=createAsyncThunk('news/fetchNewsData' , async()=>{
    try {
        const res=await axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=50&apiKey=c8511c04e5a74500b173a6582c0bafba`)
        console.log(res.data)

        return res.data
    } catch (error) {
        console.log(error.message)

    }
})
export const fetchNewsType=createAsyncThunk('news/fetchNewsType' , async(type)=>{
    try {
        const res=await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${type}&pageSize=70&apiKey=c8511c04e5a74500b173a6582c0bafba`)
return res.data
    } catch (error) {
        console.log(error.message)

    }
})

const newsDataSlice=createSlice({
    name:"news",
    initialState:{
        isloading:false,
        isError:false,
        newsData:{},
        newsType:[],
        saveData:[]
    },
    reducers:{

        saveNewsData:(state,action)=>{
    console.log(action.payload)
    state.saveData.push(action.payload)
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNewsData.pending,(state)=>{
            state.isloading=true
        })
        .addCase(fetchNewsData.fulfilled, (state,action)=>{
            console.log(action.payload)

            state.isloading=false
            state.newsData=action.payload
        })
        .addCase(fetchNewsData.rejected,(state)=>{
            state.isError=true
        })
        .addCase(fetchNewsType.pending,(state)=>{
            state.isloading=true
        })
        .addCase(fetchNewsType.fulfilled, (state,action)=>{
            
console.log(action.payload)
            state.isloading=false
            state.newsType=action.payload
        })
        .addCase(fetchNewsType.rejected,(state)=>{
            state.isError=true
        })
    }
})
 
export const {saveNewsData}=newsDataSlice.actions

export default newsDataSlice.reducer