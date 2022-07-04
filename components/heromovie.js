import { Box } from "@mui/system";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { addToWishlist } from '../lib/movies';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlistInStore } from '../features/wishlist/wishlistSlice';
import { initMovieInfo } from "../features/movieslist/movieSlice";
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';



let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function HeroMovie({heromovie, fadeAnim, handleAnimation}){

    useEffect(()=>{
        if(fadeAnim){
            setTimeout(()=>handleAnimation(),650);
            if(wishlistFromStore.find(elt => elt.name === heromovie.title)){
                setLike(true)
            }else{
                setLike(false)
            }
        }
    },[heromovie])

    const wishlistFromStore = useSelector(state=>state.wishlist.value);
    const dispatch = useDispatch();
    const [like,setLike] = useState(false);

    let handleAddMovie = async (name,backdrop_path) => {
        let imgUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
        await addToWishlist(name,imgUrl);
        dispatch(addToWishlistInStore({name,img: imgUrl}));
        setLike(!like);
    }

    let icon;
    if(like){
        icon = <CancelIcon/>
    }else{
        icon = <FavoriteIcon/>
    }

    let starArray = [];
    for(let i = 1; i <= 10; i++){
        if(i < heromovie.vote_average){
            starArray.push(<StarIcon sx={{color:'#f1c40f'}}/>)
        }else{
            starArray.push(<StarIcon/>)
        }
    }

    return(
            <Box component="div" sx={{background:'#303a47'}} className={`flex transition-opacity duration-500 ${fadeAnim ? 'opacity-0' : 'opacity-100'} mt-1 mx-5 rounded`}>
               
                {/* Hero Movie poster */}
                <Box component="div" className="w-screen overflow-hidden" sx={{height:'80vh'}}>
                    <Link href={`/movie/${heromovie.id}`}>
                        <Box onClick={()=>dispatch(initMovieInfo(heromovie))} component="img" className="rounded-md min-w-full min-h-full overflow-hidden hover:cursor-pointer" src={`https://image.tmdb.org/t/p/original/${heromovie.backdrop_path}`}/>     
                    </Link>
                </Box>     
                <Box component='div' className="flex flex-col min-h-full ml-4 text-white" 
                    sx={{width:'30%'}}>
                    <Typography variant='h4' className="mb-5 mt-5">{heromovie.title}</Typography>
                    <p className="mb-5">{`${heromovie.overview.slice(0,200)}...`}</p>
                    <p className="mb-5 align-sub">Avis global: {starArray}</p>
                    <Link href={`/movie/${heromovie.id}`}>
                        <a onClick={()=>dispatch(initMovieInfo(heromovie))} className="text-center mb-5">Voir la page</a>
                    </Link>
                    <Button onClick={()=>handleAddMovie(heromovie.title,heromovie.backdrop_path)}>{icon}</Button>
                    
                </Box>    
            </Box>
    )


}