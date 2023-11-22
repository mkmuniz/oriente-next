import axios from "axios";
import Cookies from "js-cookie";

//const defaultUrl = "https://api-5fyq.onrender.com";
const defaultUrl = "http://172.16.39.72:3000";

let isRefreshing = false;
const instance = axios.create({
  baseURL: defaultUrl,
});

instance.interceptors.request.use((config: any) => {
  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken && !isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResponse = await axios.get(`${defaultUrl}/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.accessToken;
            const newRefreshToken = refreshResponse.data.refreshToken;
            Cookies.set("access_token", newAccessToken);
            Cookies.set("refresh_token", newRefreshToken);
            isRefreshing = false;
            return instance(error.config);
          }
        } catch (refreshError) {
          alert("Sua sessão expirou. Por favor, faça o login novamente.");
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
