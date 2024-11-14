import axios from "axios";
import Cookies from "js-cookie";

// Creat instance of axios
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Get Refresh Token
const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

// Update the token in cookies
const updateTokens = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

// Request Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // Get the original request

    if (error.response && error.response.status === 401) {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // Redirect to login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          updateTokens(accessToken, refreshToken);

          // update the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          // Retry the original request
          return axios(originalRequest);
        }
      } catch (error) {
        // Redirect to login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        // Remove tokens
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // Reject the promise
        return Promise.reject(error);
      }
    }
    // Other errors
    return Promise.reject(error);
  }
);

export default api;
