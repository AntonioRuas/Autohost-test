import axios from "axios";

// Create an axios instance for the queries and mutations
export const getApiClient = () => {
  return axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
};
