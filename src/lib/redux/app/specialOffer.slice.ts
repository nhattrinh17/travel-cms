import { createSlice } from '@reduxjs/toolkit';

interface SpecialOfferCurrentSlice {
  specialOffers: {
    id: number;
    name: string;
    content: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const SpecialOfferCurrentSlice = createSlice({
  name: 'specialOffer',
  initialState: {
    specialOffers: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as SpecialOfferCurrentSlice,
  reducers: {
    setDataSpecialOffers: (state, action) => {
      state.specialOffers = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageSpecialOffer: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataSpecialOffer: (state) => {
      state.specialOffers = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataSpecialOffer: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataSpecialOffer, resetDataSpecialOffer, setDataSpecialOffers, setLimitOrPageSpecialOffer } = SpecialOfferCurrentSlice.actions;

export default SpecialOfferCurrentSlice.reducer;
