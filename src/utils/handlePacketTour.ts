import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import moment from 'moment';
import { resetDataPacketTour, setDataPacketTours } from '@/lib/redux/app/packetTour.slice';
import { createPacketTour, getAllPacketTour, updatePacketTour } from './api';

export const usePacketTour = (limitCustom?: number) => {
  const { packetTours, refreshData, page, limit } = useAppSelector((state) => state.packetTour);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllPacketTour(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataPacketTours({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      packetTours.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreatePacketTour = async (data: any, dispatch: any) => {
  const req = await createPacketTour(data);
  if (req?.data) {
    dispatch(resetDataPacketTour());
  } else {
    return false;
  }
};

export const handleUpdatePacketTour = async (id: number, data: any, dispatch: any) => {
  const req = await updatePacketTour(id, data);
  if (req?.data) {
    dispatch(resetDataPacketTour());
  } else {
    return false;
  }
};
