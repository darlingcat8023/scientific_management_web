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

function userList(data) {
  return axios
    .get("/api/account/filter", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function userDetail(data) {
  return axios
    .get("/api/account/securityDetail", { params: data })
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
  async userList(data) {
    return userList(data);
  },
  async userDetail(data) {
    return userDetail(data);
  },
};
