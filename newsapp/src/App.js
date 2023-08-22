import React, { useEffect } from 'react'
import './App.css';
import { Box, CardMedia, Typography } from '@mui/material';
import Navbar from './common/Navbar';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { fetchNewsData } from './slice/newsDataslice';
import { Route, Routes } from 'react-router-dom';
import NewsCatogory from './pages/NewsCatogory';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import SaveData from './pages/SaveData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Base_URL='http://localhost:4000'

const App = () => {
  const dispatch=useDispatch()

useEffect(()=>{
  dispatch(fetchNewsData())
},[dispatch])
  


  return (
 <Box sx={{width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.2)'}}>
<ToastContainer/>






  <Box sx={{width:"100%",height:'10vh',backgroundColor:'',position:'sticky',zIndex:'100',top:'0'}}>
  <Navbar/>
</Box>
<Box sx={{width:"100%",height:'20vh',backgroundColor:'transparent',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
<CardMedia
                    component="img"
                    
                    image='./assets/akbaar.jpg'
                    alt=""
                    sx={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',zIndex:'-1'}}
                  />
                  <Typography sx={{fontSize:'3rem',fontWeight:'bold',color:'white',fontFamily:'sans-serif',textShadow:'1px 3px 2px black'}}>TAJAKHABAR</Typography>
                  
</Box>

<Box sx={{width:'100%',}}>
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/newstype' element={<NewsCatogory/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/register' element={<RegisterPage/>} />
    <Route path='/savedata' element={<SaveData/>} />
  </Routes>

</Box>
 </Box>
  )
}

export default App
