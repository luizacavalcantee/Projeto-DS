import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projeto-ds-dvg4.onrender.com/'
});

export default api;
