import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
const Base_URL='http://localhost:4000'
const SaveData = () => {
  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('600'));
  const[savedData,setSavedData]=useState([])
    console.log(savedData)


    useEffect(()=>{
      const fetchSavedNews=async()=>{
        try {
          const res =await axios.get(`${Base_URL}/news`)
          console.log(res)
          setSavedData(res.data)
        } catch (error) {
          console.log(error)
        }
      
      }
      fetchSavedNews()
      },[])

  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

<Grid container sx={{width:'90%',marginTop:'1rem',}}>
 {
      savedData.length>0 && savedData.map((item,index)=>{
        return(
            <Grid key={index} item xs={12} sx={{backgroundColor:'',height:'35vh',marginTop:'1rem',padding:''}}>
            <Paper elevation={20} sx={{width:'100%',height:'100%'}} >
            <Card sx={{width:'100%',height:'100%',display:"flex",alignItems:'center',justifyContent:isSmallScreen ? '':'center',flexDirection:isSmallScreen ? 'column':''}}>
         <Box sx={{width:isSmallScreen ?'100%' :'40%',height:isSmallScreen ? '40%' :'100%'}}>
         <CardMedia
                    component="img"
                    
                    image={item.urlToImage}
                    alt=""
                    sx={{width:'100%',height:'100%',objectFit:'cover'}}
                  />
            </Box>   
            <CardContent sx={{height:isSmallScreen ? '' :'100%',width:isSmallScreen ? '99%':'60%',position:'relative'}}>
                  <Typography  sx={{fontSize:'1.2rem',fontWeight:'600'}}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.content}
                    
                    </Typography>
                    <CardActions sx={{position:'absolute',right:'0',bottom:isSmallScreen ? '0':'.6rem'}} >
                    <IconButton aria-label="add to favorites" title='save'>
                      <FavoriteIcon/>
                    </IconButton>
                    </CardActions>
                  </CardContent>
            </Card>
            </Paper>
            </Grid>
        )
    })
 }           
       

        </Grid>
    </Box>

  )
}

export default SaveData
