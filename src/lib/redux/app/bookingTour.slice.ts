import { createSlice } from '@reduxjs/toolkit';

interface bookingTourSlice {
  bookingTours: {
    id: number;
    tour: {
      name: string;
    };
    date: string;
    fullName: string;
    email: string;
    phone: string;
    quantity: number;
    country: string;
    detail: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const bookingTourSlice = createSlice({
  name: 'bookingTour',
  initialState: {
    bookingTours: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as bookingTourSlice,
  reducers: {
    setDataBookingTours: (state, action) => {
      state.bookingTours = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageBookingTour: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataBookingTour: (state) => {
      state.bookingTours = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataBookingTour: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataBookingTour, resetDataBookingTour, setDataBookingTours, setLimitOrPageBookingTour } = bookingTourSlice.actions;

export default bookingTourSlice.reducer;
