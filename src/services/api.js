const { default: axios } = require("axios");
const { APP_BASE_URL } = require("../configs/Constants");

const instance = axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/signin" && err.response) {
      // if unauthorized is occur, token will be refreshed (by expired time)
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const rs = await instance.post("/auth/refresh-token", {
            refreshToken: user.refreshToken,
          });
          localStorage.setItem("user", JSON.stringify(rs.data));
        } catch (error) {
          // if token is expired, user need to re-login
          localStorage.removeItem("user");
          window.location = "/signIn";
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
