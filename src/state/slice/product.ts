import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company, ProductType, User, ProductState } from '../../types'

export const getProduct = createAsyncThunk("getProduct", async () => {
  const response = await axios.get('https://api-test.innoloft.com/product/6781/')
  return response.data
})

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (updatedProduct: Partial<ProductType>, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        'https://api-test.innoloft.com/product/6781/',
        updatedProduct
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isFulfilled: false
  } as ProductState,
  reducers: {
    updatedDescription(state, action) {
      if (state.data) state.data.description = action.payload
    },
    updatedVideoLink(state, action) {
      if (state.data) state.data.video = action.payload
    },
    updatedBModelsAndCategories(state, action) {
      if (state.data) state.data = { ...state.data, ...action.payload }
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true
    }),
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.isFulfilled = true
        state.isLoading = false
        state.data = action.payload

      }),
      builder.addCase(getProduct.rejected, (state, action) => {
        console.log('Error', action.payload)
        state.isError = true
        state.isLoading = false

      }), builder.addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isFulfilled = true;
      state.isLoading = false;
      // We are not updating the data because the PUT request is not being saved.
      // state.data = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isLoading = false;
    });


  }
});

export const { updatedDescription, updatedVideoLink, updatedBModelsAndCategories } = productSlice.actions;
export default productSlice.reducer
