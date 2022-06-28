import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function MovieResume(){
    let movieInfo = useSelector((state)=>state.movieInfo.value);

    return(
        <Box component="div" className="flex flex-col mb-7">
            <Box component="img" src={`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`} className="rounded-md mb-7 shadow-lg"/>
            <Typography variant="h3">{movieInfo.title}</Typography>
            <Typography variant="subtitle1" className="mb-5 text-slate-400">Titre original: {movieInfo.original_title}</Typography>
            <Typography variant="body1">{movieInfo.overview}</Typography>
        </Box>
    )
}