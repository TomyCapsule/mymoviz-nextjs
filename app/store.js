import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import movieInfoReducer from '../features/movieslist/movieSlice';

export default configureStore({
  reducer: {
    wishlist: wishlistReducer,
    movieInfo: movieInfoReducer
  },
})