<template>
  <div id="i-created-project">
    <div class="header">
      <H2>我参加的项目</H2>
    </div>
    <el-divider />
    <el-table :data="projectList" :loading="loading">
      <el-table-column label="ID" prop="id" width="80"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="20"
      :total="count"
      @current-change="page_change"
      :current-page="page"
    />
  </div>
</template>

<script>
import projectApi from "@/api/project";

export default {
  name: "iJoinedProject",
  data: () => {
    return {
      count: 0,
      page: 1,
      projectList: [],
      loading: false,
      projectTypeList: [],
    };
  },
  methods: {
    page_change: function (val) {
      this.loading = true;
      this.page = val;
      projectApi
        .iJoinedProject({
          userId: 1,
          page: val,
        })
        .then((res) => {
          this.projectList = res.data;
          this.loading = false;
        });
    },
    getData() {
      this.loading = true;
      projectApi
        .iJoinedProjectCount({
          userId: 1,
        })
        .then((res) => {
          this.count = res.data;
          projectApi
            .iJoinedProject({
              userId: 1,
              page: this.page,
            })
            .then((res) => {
              this.loading = false;
              this.projectList = res.data;
            });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="less">
.header {
  padding: 0px;
  text-align: left;
}
</style>
