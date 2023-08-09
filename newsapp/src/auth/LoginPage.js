
import React, { useEffect, useState } from 'react'
import { Box, Button, CardMedia, Paper, Stack, TextField, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useCookies} from 'react-cookie' 
import { toast } from 'react-toastify';


const LoginPage = () => {
const navigate=useNavigate()
 
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
const[_,setCookies]=useCookies(['access_token'])




  const handleLogIn=async()=>{
    try {
    const response=await axios.post('http://localhost:4000/login' , {
      email,password
    })
    console.log(response.data)
    if(response.data.message==='email or password is incorrect'){
toast.error('Email or password is incorrect')
    }else{
      setCookies('access_token',response.data.token)
      window.localStorage.setItem('userId',response.data.userID )
      toast.success('Successfully Loged in')
      navigate('/')
    }

       } catch (error) {
        console.log(error)
         toast.error('server error')
       }
 
  }

  return (
    <Box sx={{width:'100%',height:'70vh',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',position:'relative'}}>
   <CardMedia
                    component="img"
                    
                    image='./assets/akbaar.jpg'
                    alt=""
                    sx={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',zIndex:'-1'}}
                  />
    <Paper elevation={20}>
        <Box sx={{width:300,height:400,background:'white',color:"black"}}>
        <Stack direction='column' justifyContent='space-evenly' alignItems='center' sx={{width:'100%',height:'100%'}}>
    
          
         <Typography variant='h6' sx={{fontWeight:'600',color:'red'}}>Sign in</Typography>

         
 
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
              onChange={(e)=>{setPassword(e.target.value)}}
            />
       
    
            
          <Button size='small' variant='outlined' onClick={handleLogIn} > log in</Button>
         <NavLink to={'/register'}> <Button color='secondary' size='small'>create an account</Button></NavLink> 
    
        </Stack>
        </Box>
        </Paper>
      </Box>
  )
}

export default LoginPage