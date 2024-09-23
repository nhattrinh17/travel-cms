import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import specialOfferReduce from './app/specialOffer.slice';
import accompaniedServiceReduce from './app/accompaniedService.slice';
import destinationReduce from './app/destination.slice';
import detailLocationReduce from './app/detailLocation.slice';
import cruiseReduce from './app/cruise.slice';
import packetTourReduce from './app/packetTour.slice';
import tourReduce from './app/tour.slice';
import otherServiceBookingReduce from './app/otherServiceBooking.slice';
import bookingCruiseReduce from './app/bookingCruise.slice';
import bookingTourReduce from './app/bookingTour.slice';
import reviewReduce from './app/review.slice';
import blogCategoriesReduce from './app/blogCategories.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      users: userReduce,
      specialOffer: specialOfferReduce,
      accompaniedService: accompaniedServiceReduce,
      destination: destinationReduce,
      detailLocation: detailLocationReduce,
      cruise: cruiseReduce,
      packetTour: packetTourReduce,
      tour: tourReduce,
      otherServiceBooking: otherServiceBookingReduce,
      bookingCruise: bookingCruiseReduce,
      bookingTour: bookingTourReduce,
      review: reviewReduce,
      blogCategories: blogCategoriesReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
