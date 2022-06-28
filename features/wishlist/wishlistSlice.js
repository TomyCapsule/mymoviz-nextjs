import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        value: []
    },
    reducers:{
        initializeWishlist:(state,action)=>{
            console.log('actionFromWishlistSlicer',action);
            state.value = [...action.payload];
        },
        addToWishlistInStore:(state,action)=>{
            state.value = [...state.value, action.payload];
        },
        deleteFromWishlistInStore:(state,action)=>{
            let copy = [...state.value].filter(elt => elt.name != action.payload);
            state.value = copy;
        }
    }

})

export const { initializeWishlist,addToWishlistInStore,deleteFromWishlistInStore } = wishlistSlice.actions

export default wishlistSlice.reducer