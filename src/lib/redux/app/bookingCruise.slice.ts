import { createSlice } from '@reduxjs/toolkit';

interface bookingCruiseSlice {
  bookingCruises: {
    id: number;
    cruise: {
      name: string;
    };
    typeItineraries: string;
    date: string;
    totalRoom: number;
    fullName: string;
    email: string;
    phone: string;
    totalAdult: number;
    totalChildren: number;
    country: string;
    detail: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const bookingCruiseSlice = createSlice({
  name: 'bookingCruise',
  initialState: {
    bookingCruises: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as bookingCruiseSlice,
  reducers: {
    setDataBookingCruises: (state, action) => {
      state.bookingCruises = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageBookingCruise: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataBookingCruise: (state) => {
      state.bookingCruises = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataBookingCruise: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataBookingCruise, resetDataBookingCruise, setDataBookingCruises, setLimitOrPageBookingCruise } = bookingCruiseSlice.actions;

export default bookingCruiseSlice.reducer;
