import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const response = await axios.get('https://api-test.innoloft.com/product/6781/')
  return response.data
})

interface ProductType {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  implementationEffortText: string | null;
  investmentEffort: string;
  trl: {
    id: number;
    name: string;
  };
  video: string;
  user: {
    id: number;
    email: string;
    firstName: string;
  };
  company: any
}

interface ProductState {
  isLoading: boolean;
  data: ProductType | null;
  isError: boolean;
  isFulfilled: boolean;
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isFulfilled: false
  } as ProductState,
  reducers: {},
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

      })

  }
});

export default productSlice.reducer;
