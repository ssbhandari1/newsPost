import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewsData } from '../slice/newsDataslice';
import { toast } from 'react-toastify';

const NewsCatogory = () => {


const dispatch=useDispatch()

  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('600'));
    const newsCatagory=useSelector((state)=>state.data.newsType)
    console.log(newsCatagory?.articles)
    const userId=window.localStorage.getItem('userId')
    const saveData=useSelector((state)=>state.data.saveData)
    
    const handleNewssave=async(id)=>{
 
      if(userId){
        try {
          const itemInCart=saveData.find((item,index)=>item.title===id)
       
      
          if(!itemInCart){
          const selectedItem= newsCatagory?.articles.find((item,index)=>item.title===id)
          if(selectedItem){
            dispatch(saveNewsData(selectedItem))
           toast.success('Select Item Saved')
          }
          }else{
            toast.error('Item already in saved!');
          }
        } catch (error) {
          toast.error(error)
        }
      }else{
        toast.info('Please login first ')
      }
      
       
      
       
      }

  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

<Grid container sx={{width:'90%',marginTop:'1rem',}}>
 {
      newsCatagory?.articles && newsCatagory?.articles.map((item,index)=>{
        return(
            <Grid key={item.title} item xs={12} sx={{backgroundColor:'',height:'35vh',marginTop:'1rem',padding:''}}>
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
                    <IconButton aria-label="add to favorites" title='save' onClick={()=>handleNewssave(item.title)}>
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

export default NewsCatogory
