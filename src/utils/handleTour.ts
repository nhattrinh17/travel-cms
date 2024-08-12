import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { resetDataTour, setDataTours } from '@/lib/redux/app/tour.slice';
import { createTour, getAllItinerariesTour, getAllTour, updateTour, deleteTour } from './api';

export const useTour = (packetTourId: number, type?: number) => {
  const { tours, refreshData, page, limit, total } = useAppSelector((state) => state.tour);
  const packetTourRef = useRef(packetTourId);
  const typeTourRef = useRef(type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData || packetTourId !== packetTourRef.current || type !== typeTourRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        packetTourRef.current = packetTourId;
        typeTourRef.current = type;
        const res = await getAllTour(page, limit, packetTourId, type);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataTours({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData, packetTourId, type]);

  return {
    data:
      tours.map((i) => {
        return {
          ...i,
          typeTour: i.type == 0 ? 'Package Tour' : 'Daily Tour',
          isFlashSale: i.isFlashSale ? 'Run flash sales' : 'Normal',
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    pagination: {
      total: total,
      limit: limit,
      page: page,
    },
  };
};

export const handleCreateTour = async (data: any, dispatch: any) => {
  const req = await createTour(data);
  if (req?.data) {
    dispatch(resetDataTour());
  } else {
    return false;
  }
};

export const handleUpdateTour = async (id: number, data: any, dispatch: any) => {
  const req = await updateTour(id, data);
  if (req?.data) {
    dispatch(resetDataTour());
  } else {
    return false;
  }
};

export const handleDeleteTour = async (id: number, dispatch: any) => {
  const req = await deleteTour(id);
  if (req?.data) {
    dispatch(resetDataTour());
  } else {
    return false;
  }
};

export const useItinerariesTour = (idTour: number, refreshData: boolean) => {
  const [data, setData] = useState<
    {
      id: number;
      day: string;
      name: string;
      description: number;
      content: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      if (idTour) {
        const res = await getAllItinerariesTour(idTour);
        if (res?.data) {
          const { data, pagination } = res?.data;
          setData(data);
        }
      }
    }

    fetchData();
  }, [idTour, refreshData]);

  return data.map((i) => {
    return {
      ...i,
    };
  });
};
