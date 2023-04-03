import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const response = await axios.get('https://api-test.innoloft.com/product/6781/')
  return response.data
})
export interface Company {
  name: string;
  logo: string;
  address: {
    country: {
      name: string;
    };
    city: {
      name: string;
    };
    street: string;
    house: string;
    zipCode: string;
    longitude: string;
    latitude: string;
  };
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string
  profilePicture: string
  sex: 1
  position: string

};

export interface ProductType {
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
  user: User
  company: Company
  businessModels: {
    id: number;
    name: string
  }[]
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
  reducers: {
    updatedDescription(state, action) {
      if (state.data) state.data.description = action.payload
    },
    updatedVideoLink(state, action) {
      if (state.data) state.data.video = action.payload
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

      })

  }
});

export const { updatedDescription, updatedVideoLink } = productSlice.actions;
export default productSlice.reducer
