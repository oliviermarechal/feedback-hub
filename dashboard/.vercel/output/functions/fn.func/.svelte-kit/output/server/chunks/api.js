import axios from "axios";
const PUBLIC_API_URL = "http://localhost:3005";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const apiClient = axios.create({
  baseURL: PUBLIC_API_URL
});
apiClient.interceptors.request.use(function(config) {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});
apiClient.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response.status === 401) {
    goto("/auth/login");
  }
  return Promise.reject(error);
});
export {
  apiClient as a,
  goto as g
};
