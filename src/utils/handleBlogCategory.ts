import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import moment from 'moment';
import { resetDataBlogCategories, setDataBlogCategories } from '@/lib/redux/app/blogCategories.slice';
import { createBlogCategories, getAllBlogCategories, updateBlogCategory } from './api';

export const useBlogCategories = (limitCustom?: number) => {
  const { blogCategories, refreshData, page, limit } = useAppSelector((state) => state.blogCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllBlogCategories(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataBlogCategories({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData]);

  return {
    data:
      blogCategories.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateBlogCategories = async (data: any, dispatch: any) => {
  const req = await createBlogCategories(data);
  if (req?.data) {
    dispatch(resetDataBlogCategories());
  } else {
    return false;
  }
};

export const handleUpdateBlogCategory = async (id: number, data: any, dispatch: any) => {
  const req = await updateBlogCategory(id, data);
  if (req?.data) {
    dispatch(resetDataBlogCategories());
  } else {
    return false;
  }
};
