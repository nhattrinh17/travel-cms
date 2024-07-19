import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import moment from 'moment';
import { resetDataDestination, setDataDestinations } from '@/lib/redux/app/destination.slice';
import { createDestination, getAllDestination, updateDestination } from './api';

export const useDestination = (limitCustom?: number) => {
  const { destinations, refreshData, page, limit } = useAppSelector((state) => state.destination);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllDestination(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataDestinations({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      destinations.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateDestination = async (data: any, dispatch: any) => {
  const req = await createDestination(data);
  if (req?.data) {
    dispatch(resetDataDestination());
  } else {
    return false;
  }
};

export const handleUpdateDestination = async (id: number, data: any, dispatch: any) => {
  const req = await updateDestination(id, data);
  if (req?.data) {
    dispatch(resetDataDestination());
  } else {
    return false;
  }
};
