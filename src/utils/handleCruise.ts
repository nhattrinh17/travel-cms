import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import { createCruise, getAllCruise, updateCruise } from './api';
import { resetDataCruise, setDataCruises } from '@/lib/redux/app/cruise.slice';
export const useCruise = (idDestination: number, idDetailLocation: number) => {
  const { cruises, refreshData, page, limit } = useAppSelector((state) => state.cruise);
  const destinationRef = useRef(idDestination);
  const detailLocationRef = useRef(idDetailLocation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if ((refreshData || idDestination !== destinationRef.current || idDetailLocation !== detailLocationRef.current) && idDestination && idDetailLocation) {
        dispatch(setLoadingApp({ loading: true }));
        destinationRef.current = idDestination;
        detailLocationRef.current = idDetailLocation;
        const res = await getAllCruise(page, limit, idDestination, idDetailLocation);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataCruises({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData, idDestination, idDetailLocation]);

  return {
    data:
      cruises.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateCruise = async (data: any, dispatch: any) => {
  const req = await createCruise(data);
  if (req?.data) {
    dispatch(resetDataCruise());
  } else {
    return false;
  }
};

export const handleUpdateCruise = async (id: number, data: any, dispatch: any) => {
  const req = await updateCruise(id, data);
  if (req?.data) {
    dispatch(resetDataCruise());
  } else {
    return false;
  }
};
