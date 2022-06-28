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



let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function HeroMovie({heromovie, fadeAnim, handleAnimation}){

    useEffect(()=>{
        if(fadeAnim){
            setTimeout(()=>handleAnimation(),600);
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
        dispatch(addToWishlistInStore({name,img: imgUrl}))
        setLike(!like);
    }

    let icon;
    if(like){
        icon = <CancelIcon/>
    }else{
        icon = <FavoriteIcon/>
    }

    return(
        <>
            <Box component="div" className={`flex transition-opacity duration-500 ${fadeAnim ? 'opacity-0' : 'opacity-100'}`}>
               
                {/* Hero Movie poster */}
                <Box component="div" className="ml-5 w-screen overflow-hidden" sx={{height:'80vh'}}>
                    <Box component="img" className="min-w-full min-h-full overflow-hidden" src={`https://image.tmdb.org/t/p/original/${heromovie.backdrop_path}`}/>     
                </Box>     
                <Box component='div' className="flex flex-col min-h-full ml-4 text-white" 
                    sx={{width:'30%'}}>
                    <Typography variant='h4' className="mb-5 mt-5">{heromovie.title}</Typography>
                    <p className="mb-5">{`${heromovie.overview.slice(0,200)}...`}</p>
                    <p className="mb-5">Avis global: {heromovie.vote_average} / 10 {`(${heromovie.vote_count})`}</p>
                    <Button onClick={()=>handleAddMovie(heromovie.title,heromovie.backdrop_path)}>{icon}</Button>
                    <Link href={`/movie/${heromovie.id}`}>
                        <a onClick={()=>dispatch(initMovieInfo(heromovie))}>Voir la page</a>
                    </Link>
                </Box>    
            </Box>
        </>
    )


}