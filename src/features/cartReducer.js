
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Load cart data from local storage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart) {
            return JSON.parse(serializedCart);
        }
    } catch (err) {
        console.error("Failed to load cart from local storage:", err);
    }
    return [];
};

const initialState = {
    carts: loadCartFromLocalStorage(),
    error: null
};

// Adding Cart to the Api
export const addToCart = createAsyncThunk("add/cart", async (cartData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/cart', cartData);
        const { data } = response;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Fetching Cart Items from the Api
export const fetchCartData = createAsyncThunk("fetch/cart", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/cart');
        const { data } = response;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        // Action to save cart to local storage
        saveCartToLocalStorage(state) {
            try {
                const serializedCart = JSON.stringify(state.carts);
                localStorage.setItem('cart', serializedCart);
            } catch (err) {
                console.error("Failed to save cart to local storage:", err);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {// Save updated cart to local storage
                state.carts.push(action.payload);
                cartSlice.caseReducers.saveCartToLocalStorage(state);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {// Save fetched cart to local storage
                state.carts = action.payload;
                cartSlice.caseReducers.saveCartToLocalStorage(state);
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
