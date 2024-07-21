import { createSlice } from '@reduxjs/toolkit';

interface cruiseSlice {
  cruises: {
    id: number;
    name: string;
    destinationId: number;
    detailLocationId: number;
    contentBrief: string;
    detail: string;
    images: string;
    discount: number;
    isFlashSale: boolean;
    travelerLoves: string;
    price: number;
    totalRoom: number;
    timeLaunched: number;
    styleCruise: string;
    createdAt: string;
    accompaniedServices: { id: number }[];
    specialOffers: { id: number }[];
    otherServiceBookings: { id: number }[];
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const cruiseSlice = createSlice({
  name: 'cruise',
  initialState: {
    cruises: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as cruiseSlice,
  reducers: {
    setDataCruises: (state, action) => {
      state.cruises = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageCruise: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataCruise: (state) => {
      state.cruises = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataCruise: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataCruise, resetDataCruise, setDataCruises, setLimitOrPageCruise } = cruiseSlice.actions;

export default cruiseSlice.reducer;
