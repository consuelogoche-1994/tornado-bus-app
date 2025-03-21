import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.local.onroadts.com/v1/web',
  headers: {
    'Accept': 'application/json',
    'Accept-Language': 'es',
  }
});

export default apiClient;