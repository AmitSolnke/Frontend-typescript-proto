import createAxiosInstance from './axiosBase';

const axiosTsNewBackend = createAxiosInstance(
  import.meta.env.VITE_API_BASE_URL_TSNEWBACKEND
);

export default axiosTsNewBackend;
