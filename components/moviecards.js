import * as React from 'react';
import {useRef} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";

export default function MovieCards(props){

    let horizontalScrollRef = useRef(null);

    let handleScroll = e =>{
        e.preventDefault();
        const container = horizontalScrollRef.current;
        const containerScrollPosition = horizontalScrollRef.current.scrollLeft;

        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY * 4,
            behavior: "smooth"
        });
    }

    let handleHeroMovie = (movie) => {
        props.handleAnimation();
        setTimeout(()=>props.handleHeroMovie(movie),500);
    }

    let newMovieCards = props.movies.map((e,i)=>{
        return (
            <Card key={i} sx={{maxHeight:'150px',minWidth:'275px'}} className="mx-3 transition ease-out duration-200 hover:scale-110 hover:cursor-pointer pointer-events-auto">
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                        alt={e.title}
                        sx={{height:'150px',width:'275px'}}
                        onClick={()=>handleHeroMovie(e)}
                        className=""
                    />
                    {/* <span style={{position:'absolute',bottom:0,color:'#FFF',textShadow:'3px 2px 2px #000000',overflowWrap:'break-word',maxWidth:'275px',minWidth:'275px'}}>
                        {e.title}
                    </span> */}
            </Card>
        )
    })

    return(
        <Box ref={horizontalScrollRef} onWheel={handleScroll} component="div" 
            className="fixed bottom-0 flex items-center w-full overflow-auto overflow-x-hidden mx-0"
            sx={{mb:1, ml:3, height:"175px"}}
        >
            {newMovieCards}
        </Box>
    )
}