import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import moment from 'moment';
import { resetDataBlog, setDataBlog } from '@/lib/redux/app/blog.slice';
import { createBlog, deleteBlog, getAllBlog, updateBlog } from './api';

export const useBlog = (idBlogCategory?: number) => {
  const { blog, refreshData, page, limit, total } = useAppSelector((state) => state.blog);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (refreshData || idBlogCategory) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllBlog(page, limit, idBlogCategory);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataBlog({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [refreshData, idBlogCategory]);

  return {
    data:
      blog.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    pagination: {
      page,
      limit,
      total,
    },
  };
};

export const handleCreateBlog = async (data: any, dispatch: any) => {
  const req = await createBlog(data);
  if (req?.data) {
    dispatch(resetDataBlog());
  } else {
    return false;
  }
};

export const handleUpdateBlog = async (id: number, data: any, dispatch: any) => {
  const req = await updateBlog(id, data);
  if (req?.data) {
    dispatch(resetDataBlog());
  } else {
    return false;
  }
};

export const handleDeleteBlog = async (id: number, dispatch: any) => {
  const req = await deleteBlog(id);
  if (req?.data) {
    dispatch(resetDataBlog());
  } else {
    return false;
  }
};
