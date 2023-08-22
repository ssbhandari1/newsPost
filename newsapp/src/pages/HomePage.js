import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';

import { saveNewsData } from '../slice/newsDataslice';
import { toast } from 'react-toastify';
import axios from 'axios';
const Base_URL = 'http://localhost:4000'
//c8511c04e5a74500b173a6582c0bafba
const HomePage = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('600'));
  const newsData = useSelector((state) => state.data.newsData)
  console.log(newsData?.articles)


  const [savedItem, setSavedItem] = useState([])

  console.log(savedItem)
  const userId = window.localStorage.getItem('userId')
  // const saveData=useSelector((state)=>state.data.saveData)

  const handleNewssave = async (id) => {
    if(!userId){
      return toast.info('Please Log in First')
    }
    const selectedItem = newsData?.articles.find((item, index) => item.title === id)

    try {
      const res = await axios.post(`${Base_URL}/news`, selectedItem)
      if(res.data.message==='Item Already Saved'){
        toast.error('Item Already Saved')
      }else{
        toast.success(' Saved Successfully')
        setSavedItem(res.data.map((item)=>item.title))
      }
  
  
    } catch (error) {
      console.log(error)
      toast.error(error)

    }

  }


  useEffect(() => {
    const fetchSavedNews = async () => {
      try {
        const res = await axios.get(`${Base_URL}/news`)
        // console.log(res.data)
        setSavedItem(res.data.map((item)=>item.title))
      } catch (error) {
        console.log(error)
      }

    }
    fetchSavedNews()
  }, [])

  // const handleNewssave=async(id)=>{

  // if(userId){
  //   try {
  //     const itemInCart=saveData.find((item,index)=>item.title===id)


  //     if(!itemInCart){
  //     const selectedItem= newsData?.articles.find((item,index)=>item.title===id)
  //     if(selectedItem){
  //       dispatch(saveNewsData(selectedItem))
  //      toast.success('Select Item Saved')
  //     }
  //     }else{
  //       toast.error('Item already in saved!');
  //     }
  //   } catch (error) {
  //     toast.error(error)
  //   }
  // }else{
  //   toast.info('Please login first ')
  // }




  // }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>


      <Grid container sx={{ width: '90%', height: '60vh', marginTop: '1rem' }}>
        <Grid item xs={isSmallScreen ? 12 : 6} sx={{ backgroundColor: 'transparent', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <CardMedia
            component="img"

            image={newsData?.articles && newsData?.articles[0].urlToImage}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: "-1" }}
          />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', padding: '4px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            {newsData?.articles && newsData?.articles[0].title}
          </Typography>
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6}  >
          <Stack sx={{ width: '100%', height: "100%" }}>
            <Box sx={{ width: '100%', height: '50%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <CardMedia
                component="img"

                image={newsData?.articles && newsData?.articles[1].urlToImage}
                alt=""
                sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: "-1" }}
              />
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', padding: '4px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                {newsData?.articles && newsData?.articles[1].title}

              </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <CardMedia
                component="img"

                image={newsData?.articles && newsData?.articles[2].urlToImage}
                alt=""
                sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: "-1" }}
              />
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', padding: '4px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                {newsData?.articles && newsData?.articles[2].title}
              </Typography>
            </Box>
          </Stack>
        </Grid>



      </Grid>


      <Grid container sx={{ width: '90%', marginTop: '1rem', }}>
        {
          newsData?.articles && newsData?.articles.map((item, index) => {
            return (
              <Grid key={index} item xs={12} sx={{ backgroundColor: '', height: '35vh', marginTop: '1rem', padding: '' }}>
                <Paper elevation={20} sx={{ width: '100%', height: '100%' }} >
                  <Card sx={{ width: '100%', height: '100%', display: "flex", alignItems: 'center', justifyContent: isSmallScreen ? '' : 'center', flexDirection: isSmallScreen ? 'column' : '' }}>
                    <Box sx={{ width: isSmallScreen ? '100%' : '40%', height: isSmallScreen ? '40%' : '100%' }}>
                      <CardMedia
                        component="img"

                        image={item.urlToImage}
                        alt=""
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent sx={{ height: isSmallScreen ? '' : '100%', width: isSmallScreen ? '99%' : '60%', position: 'relative' }}>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: '600' }}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.content}

                      </Typography>
                      <CardActions sx={{ position: 'absolute', right: '0', bottom: isSmallScreen ? '0' : '.6rem' }} >
                        <IconButton aria-label="add to favorites" title='save' onClick={() => handleNewssave(item.title)}>
                          <FavoriteIcon sx={{color:savedItem.includes(item.title)&&'red'}} />
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

export default HomePage
