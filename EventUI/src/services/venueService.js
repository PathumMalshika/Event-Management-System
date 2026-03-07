import axios from "axios";

const API_URL = "http://localhost:8081/api/venues";

const venueService = {
  getAll: () => axios.get(API_URL).then(res => res.data),
  add: (venue) => axios.post(API_URL, venue).then(res => res.data),
  update: (id, venue) => axios.put(`${API_URL}/${id}`, venue).then(res => res.data),
  remove: (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data),
};

export default venueService;