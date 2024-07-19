import { BaseAxios } from '@/lib';

export const fetchUserInfo = () => {
  const axios = new BaseAxios();
  return axios.get('auth/userInfo');
};

export const getAllSpecialOffer = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'special-offer?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createSpecialOffer = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('special-offer', data);
};

export const updateSpecialOffer = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`special-offer/${id}`, data);
};

export const getAllAccompaniedService = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'accompanied-service?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createAccompaniedService = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('accompanied-service', data);
};

export const updateAccompaniedService = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`accompanied-service/${id}`, data);
};

export const getAllDestination = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'destination?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createDestination = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('destination', data);
};

export const updateDestination = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`destination/${id}`, data);
};

export const getAllDetailLocation = (page: number, limit: number, idDestination: number) => {
  const axios = new BaseAxios();
  let url = 'detail-location?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  if (idDestination) url += '&destinationId=' + idDestination;
  return axios.get(url);
};

export const createDetailLocation = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('detail-location', data);
};

export const updateDetailLocation = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`detail-location/${id}`, data);
};

export const getAllCruise = (page: number, limit: number, destinationId: number, detailLocationId: number) => {
  const axios = new BaseAxios();
  let url = 'cruise?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  if (destinationId) url += '&destinationId=' + destinationId;
  if (detailLocationId) url += '&detailLocationId=' + detailLocationId;
  return axios.get(url);
};

export const createCruise = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('cruise', data);
};

export const updateCruise = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`cruise/${id}`, data);
};
