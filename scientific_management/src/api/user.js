import axios from "../http";

function login(data) {
  return axios
    .post("/api/login", data)
    .then((response) => {
      return response;
    })
    .finally();
}

function registry(data) {
  return axios
    .post("/api/register", data)
    .then((response) => {
      return response;
    })
    .finally();
}

export default {
  async login(data) {
    return login(data);
  },
  async registry(data) {
    return registry(data);
  },
};
