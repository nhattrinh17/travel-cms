import { createSlice } from '@reduxjs/toolkit';

interface accompaniedServiceCurrentSlice {
  accompaniedServices: {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  refreshData: boolean;
}

const accompaniedServiceCurrentSlice = createSlice({
  name: 'accompaniedService',
  initialState: {
    accompaniedServices: [],
    limit: 10,
    page: 1,
    total: 0,
    refreshData: true,
  } as accompaniedServiceCurrentSlice,
  reducers: {
    setDataAccompaniedServices: (state, action) => {
      state.accompaniedServices = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.refreshData = false;
    },
    setLimitOrPageAccompaniedService: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.refreshData = true;
    },
    resetDataAccompaniedService: (state) => {
      state.accompaniedServices = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.refreshData = true;
    },

    refreshDataAccompaniedService: (state) => {
      state.refreshData = true;
    },
  },
});

export const { refreshDataAccompaniedService, resetDataAccompaniedService, setDataAccompaniedServices, setLimitOrPageAccompaniedService } = accompaniedServiceCurrentSlice.actions;

export default accompaniedServiceCurrentSlice.reducer;
