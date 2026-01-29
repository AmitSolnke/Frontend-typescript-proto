import createAxiosInstance from './axiosBase';

const axiosPrototyping = createAxiosInstance(
  import.meta.env.VITE_API_PROTOTYPING_URL
);

export default axiosPrototyping;
