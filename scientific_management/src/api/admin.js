import axios from "../http";

function login(data) {
  return axios
    .post("/admin/login", data)
    .then((response) => {
      return response;
    })
    .finally();
}

function totalList() {
  return axios
    .get("/api/projectType/list")
    .then((response) => {
      return response;
    })
    .finally();
}

function projectList(data) {
  return axios
    .get("/api/projectAudit/list", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function projectCount(data) {
  return axios
    .get("/api/projectAudit/count", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function accountInfo(data) {
  return axios
    .get("/api/account/detail", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function projectPass(data) {
  return axios
    .post("/api/projectAudit/pass", data)
    .then((response) => {
      return response;
    })
    .finally();
}

function projectReject(data) {
  return axios
    .post("/api/projectAudit/reject", data)
    .then((response) => {
      return response;
    })
    .finally();
}

export default {
  async login(data) {
    return login(data);
  },
  async totalList() {
    return totalList();
  },
  async projectList(data) {
    return projectList(data);
  },
  async projectCount(data) {
    return projectCount(data);
  },
  async accountInfo(data) {
    return accountInfo(data);
  },
  async projectPass(data) {
    return projectPass(data);
  },
  async projectReject(data) {
    return projectReject(data);
  },
};
