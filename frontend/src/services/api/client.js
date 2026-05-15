import axios from "axios";
import config from "@/config";

const client = axios.create({
  baseURL: config.API_BASE_URL,
});

const setAuthToken = (token) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

const storedToken = localStorage.getItem("token");
if (storedToken) {
  setAuthToken(storedToken);
}

export { client, setAuthToken };
