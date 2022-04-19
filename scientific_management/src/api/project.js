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
    .get("/api/projectInfo/listByParticipant", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function iJoinedProjectCount(data) {
  return axios
    .get("/api/projectInfo/countByParticipant", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function projectUpdate(data) {
  return axios
    .post("/api/projectInfo/update", data)
    .then((response) => {
      return response;
    })
    .finally();
}

function projectUser(data) {
  return axios
    .get("/api/projectParticipant/list", { params: data })
    .then((response) => {
      return response;
    })
    .finally();
}

function updateProjectUser(projectId, data) {
  return axios
    .post(`/api/projectParticipant/add?projectId=${projectId}`, data)
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
  async iJoinedProjectCount(data) {
    return iJoinedProjectCount(data);
  },
  async projectUpdate(data) {
    return await projectUpdate(data);
  },
  async projectUser(data) {
    return await projectUser(data);
  },
  async updateProjectUser(projectId, data) {
    return await updateProjectUser(projectId, data);
  },
};
