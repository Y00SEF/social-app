// import { faL } from "@fortawesome/free-solid-svg-icons";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     products: [],
//     isLoading: false,
//     error:null
// }

// export const getProducts =createAsyncThunk('productsSlice/getProducts', async () => {
//     const data = await axios.get(`https://linked-posts.routemisr.com/posts`, {
//       headers: {
//         token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZjNTFhYWUwMDZjNGZmMTkxYWYwMTczIiwiaWF0IjoxNzI0MTkzNDYwfQ.bSU5P3uvA5HsFILIT5tg6O0Uv1G4J2DnmTgI0fJb3vw`,
//       },
//     });
//     return data.data
// })
    

// const productsSlice = createSlice({
//     name: 'productsSlice',
//     initialState,
//     reducers: {
        
//     },
//     extraReducers: (builders) => {
//         builders.addCase(getProducts.pending, (state , action) => {
//             state.isLoading = true
//         })
//         builders.addCase(getProducts.fulfilled, (state, action) => {
//             state.isLoading = false
//             state.products = action.payload
//         })
//         builders.addCase(getProducts.rejected, (state , action) => {
//             state.isLoading = false
//             state.error = action.payload
//         })

        
//     }
// })

// export const productsReducer = productsSlice.reducer


