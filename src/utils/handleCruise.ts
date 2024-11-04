import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { createCruise, deleteCruise, getAllCruise, getAllItinerariesCruise, getAllRoomCruise, updateCruise } from './api';
import { resetDataCruise, setDataCruises } from '@/lib/redux/app/cruise.slice';

export const useCruise = (idDestination: number, idDetailLocation: number) => {
  const { cruises, refreshData, page, limit, total } = useAppSelector((state) => state.cruise);
  const destinationRef = useRef(idDestination);
  const detailLocationRef = useRef(idDetailLocation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData || idDestination !== destinationRef.current || idDetailLocation !== detailLocationRef.current) {
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

export const handleDeleteCruise = async (id: number, dispatch: any) => {
  const req = await deleteCruise(id);
  if (req?.data) {
    dispatch(resetDataCruise());
  } else {
    return false;
  }
};

export const useRoomCruise = (idCruise: number, itinerariesId: number, refreshData: boolean) => {
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      priceSingle: number;
      priceDouble: number;
      // priceDetail: string;
      totalRooms: number;
      typeBed: number;
      isViewOcean: string;
      acreage: number;
      location: string;
      images: string;
      specialService: string;
      notes: string;
      content: string;
      maxAdult: number;
      maxChildren: number;
      amenities: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      if (idCruise) {
        const res = await getAllRoomCruise(idCruise, itinerariesId);
        if (res?.data) {
          const { data, pagination } = res?.data;
          setData(data);
        }
      }
    }

    fetchData();
  }, [idCruise, refreshData]);

  return data.map((i) => {
    return {
      ...i,
      viewOcean: i.isViewOcean ? 'Yes' : 'No',
      priceDouble: i?.priceDouble?.toString(),
      priceSingle: i?.priceSingle?.toString(),
    };
  });
};

export const useItinerariesCruise = (idCruise: number, refreshData: boolean) => {
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
      if (idCruise) {
        const res = await getAllItinerariesCruise(idCruise);
        if (res?.data) {
          const { data, pagination } = res?.data;
          setData(data);
        }
      }
    }

    fetchData();
  }, [idCruise, refreshData]);

  return data.map((i) => {
    return {
      ...i,
    };
  });
};
