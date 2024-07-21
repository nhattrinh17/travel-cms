import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { setDataBookingCruises } from '@/lib/redux/app/bookingCruise.slice';
import { getAllBookingCruise } from './api';

export const useBookingCruise = () => {
  const { bookingCruises, refreshData, page, limit, total } = useAppSelector((state) => state.bookingCruise);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllBookingCruise(page, limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataBookingCruises({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      bookingCruises.map((i) => {
        return {
          id: i.id,
          nameCruise: i.cruise.name,
          typeItineraries: i.typeItineraries,
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

// export const handleCreatebookingCruise = async (data: any, dispatch: any) => {
//   const req = await createbookingCruise(data);
//   if (req?.data) {
//     dispatch(resetDatabookingCruise());
//   } else {
//     return false;
//   }
// };

// export const handleUpdatebookingCruise = async (id: number, data: any, dispatch: any) => {
//   const req = await updatebookingCruise(id, data);
//   if (req?.data) {
//     dispatch(resetDatabookingCruise());
//   } else {
//     return false;
//   }
// };
