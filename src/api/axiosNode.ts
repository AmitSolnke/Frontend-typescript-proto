import createAxiosInstance from './axiosBase';

const axiosNode = createAxiosInstance(
  import.meta.env.VITE_API_BASE_URL_NODE
);

export default axiosNode;
