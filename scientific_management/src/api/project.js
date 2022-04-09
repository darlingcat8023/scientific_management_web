import axios from "../http";

function projectType(data) {
  return axios
    .get("/api/projectType/filter", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function iCreatedProject(data) {
  return axios
    .get("/api/projectInfo/listByCreator", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function iCreatedProjectCount(data) {
  return axios
    .get("/api/projectInfo/countByCreator", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function iJoinedProject(data) {
  return axios
    .get("/api/register", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

export default {
  async projectType(data) {
    return await projectType(data);
  },
  async iCreatedProject(data) {
    return iCreatedProject(data);
  },
  async iCreatedProjectCount(data) {
    return iCreatedProjectCount(data);
  },
  async iJoinedProject(data) {
    return iJoinedProject(data);
  },
};
