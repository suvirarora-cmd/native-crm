import { ENV } from '../app/config/env.config';
import axios from 'axios';

const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export  {api};
