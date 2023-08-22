import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Logout, Settings } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsType } from '../slice/newsDataslice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { toast } from 'react-toastify';


const pages = ['Business', 'Sports','Health','Technology','Entertainment','Science'];
const Navbar = () => {

  const navigate=useNavigate()
const[cookies,setCookies]=useCookies(['access_token'])
const saveData=useSelector((state)=>state.data.saveData)
console.log(saveData)
const userId=window.localStorage.getItem('userId')
console.log(userId)

  const[toggle,setToggle]=useState(false)

  const[selectedCat,setSelectedCat]=useState(null)
     const dispatch=useDispatch()
    const[userMenu,setUserMenu]=useState(false)
      const handleNavPage = (type,index) => {
        console.log(type)
        if(userId){
          setSelectedCat(index)
          dispatch(fetchNewsType(type))
          navigate('/newstype')
        }else{
          toast.error('Please log in first')
        }
 
      };
    const handleOpenUsermenu=()=>{
        setUserMenu(true)
    }

      const handleClose = () => {
        setUserMenu(false)     
     };
     console.log(selectedCat)



     const toggleDrawer =()=>{
      setToggle(!toggle)
    }
    const handleLogout=()=>{
      setCookies('access_token','')
      window.localStorage.removeItem('userId')
      toast.success('Successfylly loged out')
    navigate('/login')
    }
    

    const handleNavigatet=()=>{
   
        navigate('/savedata')
  
    }
      return (
        <AppBar position="static" sx={{width:'100%',background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(3,7,225,1) 100%)'
      }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
             
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer}
                  color="inherit"
                >
                  <MenuIcon />
                  <SwipeableDrawer
          anchor="left"
            open={toggle}
            onClose={()=>{setToggle(false)}}
            onOpen={()=>{setToggle(true)}}
            PaperProps={{
              style: {
                // marginTop:'13rem',
              //  height: '400px', // Set your desired height here
              },
            }}
            style={{ zIndex: 1000 }}
          >
          <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={()=>setToggle(false)}
      onKeyDown={()=>setToggle(false)}
    >
      <List>
      <NavLink to={'/'}  >
          <ListItem  disablePadding>
            <ListItemButton>
             
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          </NavLink>  
          {pages.map((page,index) => (
                  <ListItem  key={index} disablePadding>
                  <ListItemButton   onClick={()=>handleNavPage(page.toLowerCase(),index)}>
                   
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
                ))}
      </List>
      <Divider />
   
    </Box>
          </SwipeableDrawer>
                </IconButton>
            
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
             
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },alignItems:'center',justifyContent:'center' }}>
         <Link to='/' sx={{textDecoration:'none',}}>    <Button
              variant='contained'
              color='secondary'
                    sx={{ my: 2,  display: '' }}
                  >
                   Home
                  </Button>
                  </Link> 
                {pages.map((page,index) => (
                  <Button
                    key={index}
                    variant={selectedCat===index && 'contained'}
                    onClick={()=>handleNavPage(page.toLowerCase(),index)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>

                {
                  !cookies.access_token ? (<Button variant='outline' onClick={()=>{navigate('/login')}}> Log in</Button>):( <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUsermenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src='./assets/profile.jpg'/>
                  </IconButton>
                </Tooltip> )
                }
               
                <Menu
        // anchorEl={anchorEl}
        id="account-menu"
        open={userMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 3,
          
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
         
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar  /> Profile
        </MenuItem>
    

  <MenuItem  onClick={handleNavigatet}>
  <ListItemIcon>
  <CreateNewFolderIcon fontSize="small" />
   </ListItemIcon>
Saved 
</MenuItem> 


       

      
        <Divider />
      
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon onClick={handleLogout}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  )
}

export default Navbar
