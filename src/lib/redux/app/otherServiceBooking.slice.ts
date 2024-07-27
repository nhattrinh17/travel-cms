import { createSlice } from '@reduxjs/toolkit';

interface otherServiceBookingCurrentSlice {
  otherServiceBookings: {
    id: number;
    name: string;
    description: string;
    options: string;
    type: number;
    slug: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const otherServiceBookingCurrentSlice = createSlice({
  name: 'otherServiceBooking',
  initialState: {
    otherServiceBookings: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as otherServiceBookingCurrentSlice,
  reducers: {
    setDataOtherServiceBookings: (state, action) => {
      state.otherServiceBookings = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageOtherServiceBooking: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataOtherServiceBooking: (state) => {
      state.otherServiceBookings = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataOtherServiceBooking: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataOtherServiceBooking, resetDataOtherServiceBooking, setDataOtherServiceBookings, setLimitOrPageOtherServiceBooking } = otherServiceBookingCurrentSlice.actions;

export default otherServiceBookingCurrentSlice.reducer;
