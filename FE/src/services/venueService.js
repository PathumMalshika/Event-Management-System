import axios from "axios";

const BASE_URL = "http://localhost:8081/api/venues";

export const getAllVenues = () => {
  return axios.get(BASE_URL);
};

export const getVenueById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const addVenue = (venue) => {
  return axios.post(BASE_URL, venue);
};

export const updateVenue = (id, venue) => {
  return axios.put(`${BASE_URL}/${id}`, venue);
};

export const deleteVenue = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};