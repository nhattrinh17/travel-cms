import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import { createAccompaniedService, createSpecialOffer, getAllAccompaniedService, getAllSpecialOffer, updateAccompaniedService, updateAccompaniedServiceCruise, updateAccompaniedServiceTour, updateSpecialOffer, updateSpecialOfferCruise, updateSpecialOfferTour } from './api';
import moment from 'moment';
import { resetDataSpecialOffer, setDataSpecialOffers } from '@/lib/redux/app/specialOffer.slice';
import { resetDataAccompaniedService, setDataAccompaniedServices } from '@/lib/redux/app/accompaniedService.slice';
import { refreshDataCruise } from '@/lib/redux/app/cruise.slice';
import { refreshDataTour } from '@/lib/redux/app/tour.slice';

export const useSpecialOffer = (limitCustom?: number) => {
  const { specialOffers, refreshData, page, limit, total } = useAppSelector((state) => state.specialOffer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllSpecialOffer(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataSpecialOffers({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      specialOffers.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    pagination: {
      total,
      page,
      limit,
    },
  };
};

export const handleCreateSpecialService = async (data: any, dispatch: any) => {
  const req = await createSpecialOffer(data);
  if (req?.data) {
    dispatch(resetDataSpecialOffer());
  } else {
    return false;
  }
};

export const handleUpdateSpecialService = async (id: number, data: any, dispatch: any) => {
  const req = await updateSpecialOffer(id, data);
  if (req?.data) {
    dispatch(resetDataSpecialOffer());
  } else {
    return false;
  }
};

export const useAccompaniedService = (limitCustom?: number) => {
  const { accompaniedServices, refreshData, page, limit, total } = useAppSelector((state) => state.accompaniedService);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllAccompaniedService(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataAccompaniedServices({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      accompaniedServices.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    pagination: {
      total,
      page,
      limit,
    },
  };
};

export const handleCreateAccompaniedService = async (data: any, dispatch: any) => {
  const req = await createAccompaniedService(data);
  if (req?.data) {
    dispatch(resetDataAccompaniedService());
  } else {
    return false;
  }
};

export const handleUpdateAccompaniedService = async (id: number, data: any, dispatch: any) => {
  const req = await updateAccompaniedService(id, data);
  if (req?.data) {
    dispatch(resetDataAccompaniedService());
  } else {
    return false;
  }
};

export const handleUpdateAccompaniedServiceCruise = async (cruiseId: number, accompaniedServiceIds: number[], dispatch: any) => {
  const req = await updateAccompaniedServiceCruise({
    cruiseId,
    accompaniedServiceIds,
  });
  if (req?.data) {
    dispatch(refreshDataCruise());
  } else {
    return false;
  }
};

export const handleUpdateSpecialOfferCruise = async (cruiseId: number, specialOfferIds: number[], dispatch: any) => {
  const req = await updateSpecialOfferCruise({
    cruiseId,
    specialOfferIds,
  });

  if (req?.data) {
    dispatch(refreshDataCruise());
  } else {
    return false;
  }
};

export const handleUpdateSpecialOfferTour = async (tourId: number, specialOfferIds: number[], dispatch: any) => {
  const req = await updateSpecialOfferTour({
    tourId,
    specialOfferIds,
  });

  if (req?.data) {
    dispatch(refreshDataTour());
  } else {
    return false;
  }
};

export const handleUpdateAccompaniedServiceTour = async (tourId: number, accompaniedServiceIds: number[], dispatch: any) => {
  const req = await updateAccompaniedServiceTour({
    tourId,
    accompaniedServiceIds,
  });
  if (req?.data) {
    dispatch(refreshDataTour());
  } else {
    return false;
  }
};
