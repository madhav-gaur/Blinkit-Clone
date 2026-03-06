import axios from "axios";
import SummaryApi from "../common/summaryAPI.js";

const Axios = axios.create({
  baseURL: "https://blinkit-clone-nine-delta.vercel.app/",
  withCredentials: true,
});

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
