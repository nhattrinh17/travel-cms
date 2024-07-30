import { createSlice } from '@reduxjs/toolkit';

interface TourSliceDto {
  tours: {
    id: number;
    packetTourId: string;
    type: number;
    name: string;
    contentBrief: string;
    detail: number;
    images: string;
    price: number;
    discount: number;
    isFlashSale: boolean;
    travelerLoves: string;
    createdAt: string;
    specialOffers: { id: number }[];
    accompaniedServices: { id: number }[];
    itineraries: { id: number }[];
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tours: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as TourSliceDto,
  reducers: {
    setDataTours: (state, action) => {
      state.tours = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageTour: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataTour: (state) => {
      state.tours = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataTour: (state) => {
      state.refreshData = true;
    },
  },
});

export const {
  //
  refreshDataTour,
  resetDataTour,
  setDataTours,
  setLimitOrPageTour,
} = tourSlice.actions;

export default tourSlice.reducer;
