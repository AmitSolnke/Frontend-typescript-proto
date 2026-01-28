import createAxiosInstance from './axiosBase';

const axiosTicketing = createAxiosInstance(
  import.meta.env.VITE_API_BASE_URL_TICKETING
);

export default axiosTicketing;
