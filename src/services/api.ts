import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cpp-kenzie-api.herokuapp.com/',
});
