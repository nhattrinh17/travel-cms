import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import moment from 'moment';
import { resetDataReview, setDataReviews } from '@/lib/redux/app/review.slice';
import { createReview, deleteReview, getAllReview, updateReview } from './api';

export const useReview = (idCruise: number, idTour: number) => {
  const { reviews, refreshData, page, limit } = useAppSelector((state) => state.review);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllReview(page, limit, idCruise, idTour);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataReviews({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      reviews.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateReview = async (data: any, dispatch: any) => {
  const req = await createReview(data);
  if (req?.data) {
    dispatch(resetDataReview());
  } else {
    return false;
  }
};

export const handleUpdateReview = async (id: number, data: any, dispatch: any) => {
  const req = await updateReview(id, data);
  if (req?.data) {
    dispatch(resetDataReview());
  } else {
    return false;
  }
};

export const handleDeleteReview = async (id: number, dispatch: any) => {
  const req = await deleteReview(id);
  if (req?.data) {
    dispatch(resetDataReview());
  } else {
    return false;
  }
};
