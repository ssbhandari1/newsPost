
import React, { useState } from 'react';
import { Avatar, Box, Button, CardMedia, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Base_URL='https://news-post.onrender.com'


const RegisterPage = () => {
  const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPass]=useState('')


    const handleRegister=async()=>{
      try {
  await axios.post(`${Base_URL}/register`,{
    email,password
     })
     toast.success('Registration complette')
  navigate('/login')
      } catch (error) {
        toast.error(error)
      }
    }
  return (
    <Box sx={{width:'100%',height:'70vh',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',position:'relative'}}>
    <CardMedia
                     component="img"
                     
                     image='./assets/akbaar.jpg'
                     alt=""
                     sx={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',zIndex:'-1'}}
                   />    <Paper elevation={20}>
        <Box sx={{width:300,height:400,background:'white',color:"black"}}>
        <Stack direction='column' justifyContent='space-evenly' alignItems='center' sx={{width:'100%',height:'100%'}}>
    
          
         <Typography variant='h6' sx={{fontWeight:'600',color:'red'}}>Register</Typography>

         
 
        <TextField
              label="Email"
              id="outlined-size-small"
           type='email'
              size="small"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
             <TextField
              label="Password"
              id="outlined-size-small"
          //  type='password'
              size="small"
              value={password}
              onChange={(e)=>{setPass(e.target.value)}}
            />
       
    
            
          <Button size='small' variant='outlined' onClick={handleRegister} > Sign Up</Button>
         <NavLink to={'/login'}> <Button color='secondary' size='small'>already have account</Button></NavLink> 
    
        </Stack>
        </Box>
        </Paper>
      </Box>
  )
}

export default RegisterPage
