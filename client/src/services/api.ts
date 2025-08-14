import axios from 'axios';

const api = axios.create({
  baseURL: '/school-api'
});

export default api;
