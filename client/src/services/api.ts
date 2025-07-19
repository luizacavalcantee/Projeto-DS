import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projeto-ds-wab3.onrender.com/'
});

export default api;
