import { createSlice } from "@reduxjs/toolkit";
import ProductsData from "../data/ListOfProducts";
export const userSlice = createSlice({
  name: "products",
  initialState: { value: ProductsData },
  reducers: {
    addProduct: (state, action) => {
      state.value.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.value = state.value.filter((product) => product.id !== action.payload.id);
    },
    updateProductName: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.name = action.payload.name;
        }
      });
    },
    updateProductPrice: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.price = action.payload.price;
        }
      });
    },
    updateProductNation: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.nation = action.payload.nation;
        }
      });
    },
    updateProductSex: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.sex = action.payload.sex;
        }
      });
    },
    updateProductStyle: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.style = action.payload.style;
        }
      });
    },
    updateProductImage: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.img = action.payload.img;
        }
      });
    },
  },
});
export default userSlice.reducer;
export const { addProduct, deleteProduct, updateProductName, updateProductPrice, updateProductNation, updateProductSex, updateProductStyle, updateProductImage } = userSlice.actions;
