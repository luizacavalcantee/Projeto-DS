import axios from 'axios';

const api = axios.create({
  baseURL: "http://vm-cinboraimpactar2.cin.ufpe.br/escolaongback"
});

export default api;