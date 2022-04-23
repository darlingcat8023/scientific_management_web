<template>
  <div>
    <el-table :data="totalList">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="类型" prop="typeName"></el-table-column>
      <el-table-column
        label="创建的项目"
        prop="createdProjects"
      ></el-table-column>
      <el-table-column
        label="通过的项目"
        prop="passedProjects"
      ></el-table-column>
      <el-table-column
        label="拒绝的项目"
        prop="rejectedProjects"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import adminApi from "../../api/admin.js";

export default {
  name: "totalList",
  data: () => {
    return {
      totalList: [],
    };
  },
  created() {
    adminApi.totalList().then((res) => {
      this.totalList = res.data;
    });
  },
};
</script>

<style scoped></style>
