import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import { resetDataDetailLocation, setDataDetailLocations } from '@/lib/redux/app/detailLocation.slice';
import { createDetailLocation, getAllDetailLocation, updateCruiseDetailLocation, updateDetailLocation } from './api';
import { refreshDataCruise } from '@/lib/redux/app/cruise.slice';
export const useDetailLocation = (idDestination: number, limitCustom?: number) => {
  const { detailLocations, refreshData, page, limit } = useAppSelector((state) => state.detailLocation);
  const destinationRef = useRef(idDestination);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if ((refreshData || idDestination !== destinationRef.current) && idDestination) {
        dispatch(setLoadingApp({ loading: true }));
        destinationRef.current = idDestination;
        const res = await getAllDetailLocation(page, limitCustom || limit, idDestination);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataDetailLocations({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData, idDestination]);

  return {
    data:
      detailLocations.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateDetailLocation = async (data: any, dispatch: any) => {
  const req = await createDetailLocation(data);
  if (req?.data) {
    dispatch(resetDataDetailLocation());
  } else {
    return false;
  }
};

export const handleUpdateDetailLocation = async (id: number, data: any, dispatch: any) => {
  const req = await updateDetailLocation(id, data);
  if (req?.data) {
    dispatch(resetDataDetailLocation());
  } else {
    return false;
  }
};

export const handleUpdateCruiseDetailLocation = async (cruiseId: number, detailLocationIds: number[], dispatch: any) => {
  const req = await updateCruiseDetailLocation({
    cruiseId,
    detailLocationIds,
  });

  if (req?.data) {
    dispatch(refreshDataCruise());
  } else {
    return false;
  }
};
