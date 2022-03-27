import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

export default useAxios;
