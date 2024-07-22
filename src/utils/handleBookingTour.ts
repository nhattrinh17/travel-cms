import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { setDataBookingTours } from '@/lib/redux/app/bookingTour.slice';
import { getAllBookingTour } from './api';

export const useBookingTour = () => {
  const { bookingTours, refreshData, page, limit, total } = useAppSelector((state) => state.bookingTour);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllBookingTour(page, limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataBookingTours({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      bookingTours.map((i) => {
        return {
          id: i.id,
          nameTour: i.tour.name,
          date: moment(i.date).format('YYYY/MM/DD'),
          country: i.country,
          fullName: i.fullName,
          email: i.email,
          phone: i.phone,
          detail: i.detail,
        };
      }) || [],
    pagination: {
      total: total,
      limit: limit,
      page: page,
    },
  };
};

// export const handleCreatebookingTour = async (data: any, dispatch: any) => {
//   const req = await createbookingTour(data);
//   if (req?.data) {
//     dispatch(resetDatabookingTour());
//   } else {
//     return false;
//   }
// };

// export const handleUpdatebookingTour = async (id: number, data: any, dispatch: any) => {
//   const req = await updatebookingTour(id, data);
//   if (req?.data) {
//     dispatch(resetDatabookingTour());
//   } else {
//     return false;
//   }
// };
