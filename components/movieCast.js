import { getMovieCast } from '../lib/movies';
import { Box, Typography } from '@mui/material';
import { useEffect,useState } from 'react';

export default function MovieCast(props) {
    const [movieCast, setMovieCast] = useState(null);
    let movieCastToDisplay = []
    useEffect(()=>{
        async function getCast(id){
            let temp = await getMovieCast(id);
            setMovieCast(temp);  
        }
        getCast(props.movie_id)
    },[])

    if(movieCast){
        console.log('movieCast',movieCast)
        movieCastToDisplay = movieCast.cast.slice(0,12).map((elt,index)=>{
            let profileSrc = "";
            elt.profile_path 
            ? profileSrc = `https://image.tmdb.org/t/p/w500${elt.profile_path}`
            : profileSrc = '/images/generic_avatar.png'
            return(
                <Box key={index} component="div" className="flex flex-col justify-center items-center">
                    <Box component="img" src={profileSrc} className="w-1/2 h-1/2 rounded-md" alt={elt.name}/>
                    <Typography variant="subtitle1">
                        {elt.original_name}
                    </Typography>
                    <Typography variant="subtitle2" className="text-slate-400">
                        {elt.character ? elt.character.split('/')[0] : "N/A"}
                    </Typography>
                </Box>
            )
        })
    }

  return (
    <>
        <Typography variant="h4" className="mb-5">Casting</Typography>
        <Box component="div" className="grid grid-cols-4 gap-4 justify-center items-center">
            {movieCastToDisplay}
        </Box>
    </>
  );
}
