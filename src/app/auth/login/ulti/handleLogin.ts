import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getUserInfo, login } from './api';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';

export const handleLogin = async (userName: string, password: string, isRemember: boolean, router: AppRouterInstance, dispatch: any) => {
  const res = await login(userName, password, isRemember);
  if (res) {
    const { access_token, refresh_token } = res?.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);

    const userInfo = await getUserInfo();
    if (userInfo) {
      dispatch(setDataUserLogin(userInfo?.data));
      return router.push('/admin/user');
    }
  }
  return true;
};
