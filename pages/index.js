import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import HeroMovie from '../components/heromovie';
import MovieCards from '../components/moviecards';
import React, {useEffect, useState} from 'react';
import {getMovies, getWishlist} from '../lib/movies';
import { useDispatch } from 'react-redux';
import { initializeWishlist } from '../features/wishlist/wishlistSlice';



export async function getStaticProps(){

  const getMoviesFromAPI = await getMovies();
  const getWishlistFromAPI = await getWishlist();
  return {
    props:{
      movies: getMoviesFromAPI.results,
      wishlist: getWishlistFromAPI
    }
  }
}

export default function App({movies,wishlist}) {

  useEffect(()=>{
    dispatch(initializeWishlist(wishlist.wishlist))
    console.log('movies',movies)
  },[])

  const [heromovie, setheromovie] = useState(movies[0]);
  const [fadeAnim, setFadeAnim] = useState(false)
  const dispatch = useDispatch();

  
  let handleHeroMovie = (movie) => {
    setheromovie(movie);
  }

  let handleAnimation = () => {
    setFadeAnim(!fadeAnim);
  }

  return (
    <>
      <Layout>
        <HeroMovie fadeAnim={fadeAnim} heromovie={heromovie} handleAnimation={handleAnimation} />
        <MovieCards handleHeroMovie={handleHeroMovie} handleAnimation={handleAnimation} movies={movies}/>
      </Layout>
    </>
  )
}
