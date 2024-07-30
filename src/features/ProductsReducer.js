import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  productDetails:{},
  error: null,
};
// Fetching products from the api
export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/products"
      );
      const { data } = response;
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Failed to Fetch Produts",error);
      return rejectWithValue(error.message);
    }
  }
);

// Adding products to the api
export const addProducts = createAsyncThunk(
  "add/products",
  async (productsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/products",
        productsData
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log("Failed to Add",error);
      return rejectWithValue(error.message);
    }
  }
);

// get Products by id

export const fetchProductsById = createAsyncThunk(
  "fetchById/products",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/products/${id}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log("Failed to fetch products by id",error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update the products

export const toUpdateProducts = createAsyncThunk(
  "update/products",
  async ({ id, updatedProducts }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/products/${id}`,
        updatedProducts
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log("Failed to update product",error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Delete Products

export const removeProducts = createAsyncThunk(
  "remove/products",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://my-json-server.typicode.com/Mdirfan-ul/Ecommerce/products/${id}`
      );
      return id;
    } catch (error) {
      console.log("Failed to delete product",error);
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchProducts.pending, (state) => {// fetching products
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProducts.fulfilled, (state, action) => { // Adding products
        state.products.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {// fetch products by id
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toUpdateProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(toUpdateProducts.fulfilled, (state, action) => {// Updating products
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        );
      })
      .addCase(toUpdateProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeProducts.fulfilled, (state, action) => {// Removing products
        const id = action.payload;
        state.products = state.products.filter((product) => product.id !== id);
      })
      .addCase(removeProducts.rejected, (state, action) => {
       
        state.error = action.payload;
      });
  },
});

const productsReducer = productSlice.reducer;

export default productsReducer;
