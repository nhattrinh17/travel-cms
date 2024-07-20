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

export const getAllPacketTour = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'packet-tour?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createPacketTour = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('packet-tour', data);
};

export const updatePacketTour = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`packet-tour/${id}`, data);
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
  let url = 'cruise/cms?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  if (destinationId > 0) url += '&destinationId=' + destinationId;
  if (detailLocationId > 0) url += '&detailLocationId=' + detailLocationId;
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

export const getAllRoomCruise = (idCruise: number) => {
  const axios = new BaseAxios();
  return axios.get(`cruise/${idCruise}/room`);
};

export const addOrUpdateRoomCruise = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`cruise/room`, data);
};

export const getAllItinerariesCruise = (idCruise: number) => {
  const axios = new BaseAxios();
  return axios.get(`cruise/${idCruise}/itineraries`);
};

export const addOrUpdateItinerariesCruise = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`cruise/itineraries`, data);
};

export const updateAccompaniedServiceCruise = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`cruise/accompanied-service`, data);
};

export const updateSpecialOfferCruise = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`cruise/special-offer`, data);
};

export const getAllTour = (page: number, limit: number, packetTourId: number, type?: number) => {
  const axios = new BaseAxios();
  let url = 'tour/cms?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  if (packetTourId) url += '&packetTourId=' + packetTourId;
  if (typeof type == 'number' && type >= 0) url += '&type=' + type;
  return axios.get(url);
};

export const createTour = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('tour', data);
};

export const updateTour = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`tour/${id}`, data);
};

export const updateSpecialOfferTour = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`tour/special-offer`, data);
};

export const updateAccompaniedServiceTour = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`tour/accompanied-service`, data);
};

export const getAllItinerariesTour = (idTour: number) => {
  const axios = new BaseAxios();
  return axios.get(`tour/${idTour}/itineraries`);
};

export const addOrUpdateItinerariesTour = (data: any) => {
  const axios = new BaseAxios();
  return axios.post(`tour/itineraries`, data);
};
