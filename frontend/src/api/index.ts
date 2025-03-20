
import axios from 'axios';
import { LINK } from '../constant';

const api = axios.create({
  baseURL: `${LINK}`, // Your Express server URL
  withCredentials: true // Important for cookies!
});

export default api;