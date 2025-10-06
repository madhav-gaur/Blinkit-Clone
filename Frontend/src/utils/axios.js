import SummaryApi, { baseURL } from "../common/summaryAPI";
import axios from "axios";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

// attach access token before each request
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// handle responses + auto refresh
Axios.interceptors.response.use(
  async (response) => {
    // ✅ case: backend sends 200 but with "jwt expired" in body
    if (
      response.data?.message?.toLowerCase().includes("jwt expired") &&
      localStorage.getItem("refreshToken")
    ) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const originalRequest = response.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest); // retry with new token
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }

    return response; // normal successful response
  },
  async (error) => {
    const originalRequest = error.config;

    // ✅ case: backend sends proper 401
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// helper to call refresh token API
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.data?.data?.accessToken;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return null;
  }
};

export default Axios;
