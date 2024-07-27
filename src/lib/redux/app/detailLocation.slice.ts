import { createSlice } from '@reduxjs/toolkit';

interface DetailLocationSlice {
  detailLocations: {
    id: number;
    name: string;
    title: string;
    description: string;
    images: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const detailLocationSlice = createSlice({
  name: 'detailLocation',
  initialState: {
    detailLocations: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as DetailLocationSlice,
  reducers: {
    setDataDetailLocations: (state, action) => {
      state.detailLocations = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageDetailLocation: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataDetailLocation: (state) => {
      state.detailLocations = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataDetailLocation: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataDetailLocation, resetDataDetailLocation, setDataDetailLocations, setLimitOrPageDetailLocation } = detailLocationSlice.actions;

export default detailLocationSlice.reducer;
