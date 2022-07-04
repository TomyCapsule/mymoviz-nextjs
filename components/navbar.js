import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {useSelector,useDispatch} from 'react-redux';
import { deleteFromWishlistInStore } from '../features/wishlist/wishlistSlice';
import { deleteFromWishlist } from '../lib/movies';

export default function Navbar() {
  const wishlistFromStore = useSelector((state)=>state.wishlist.value)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  let handleDelete = (name) => {
    deleteFromWishlist(name);
    dispatch(deleteFromWishlistInStore(name));
  }

  const navbarWishlist = wishlistFromStore.map((elt,index)=>{
    return (
      <MenuItem key={index} className="hover:bg-slate-300" onClick={()=>handleDelete(elt.name)}>
        <Card className="relative">
          <CardMedia
            component="img"
            image={elt.img}
            alt={elt.name}
            sx={{width:"350px"}}
          />
          <Typography variant="subtitle1" className="absolute bottom-0 left-0 mb-4 ml-4 text-white drop-shadow-3xl">
            {elt.name}
          </Typography>
        </Card>
      </MenuItem>
    )
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:'#2d3436'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyMoviz
          </Typography>
          <IconButton 
            color="inherit"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <FavoriteIcon/>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
              {navbarWishlist}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
