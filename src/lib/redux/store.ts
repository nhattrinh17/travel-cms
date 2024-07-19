import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import specialOfferReduce from './app/specialOffer.slice';
import accompaniedServiceReduce from './app/accompaniedService.slice';
import destinationReduce from './app/destination.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      users: userReduce,
      specialOffer: specialOfferReduce,
      accompaniedService: accompaniedServiceReduce,
      destination: destinationReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
