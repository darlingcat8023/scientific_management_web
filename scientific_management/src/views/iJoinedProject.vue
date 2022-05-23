<template>
  <div id="i-created-project">
    <div class="header">
      <H2>我参加的项目</H2>
    </div>
    <el-divider />
    <el-table :data="projectList" :loading="loading">
      <el-table-column label="ID" prop="id" width="80"></el-table-column>
      <el-table-column label="项目名称" prop="projectName" width="180">
      </el-table-column>
      <el-table-column label="项目等级" prop="projectLevel"></el-table-column>
      <el-table-column label="项目来源" prop="projectSource"></el-table-column>
      <el-table-column label="项目类别" prop="projectPriority"></el-table-column>
      <el-table-column label="项目预算" prop="projectFund"></el-table-column>
      <el-table-column label="学科分类" prop="projectType"></el-table-column>
      <el-table-column label="研究方向" prop="researchDirection">
      </el-table-column>
      <el-table-column label="状态" prop="projectStatus">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.projectStatus === 0
                ? 'error'
                : scope.row.projectStatus === 1
                ? 'info'
                : scope.row.projectStatus === 2
                ? 'info'
                : scope.row.projectStatus === 3
                ? 'success'
                : ''
            "
          >
            {{
              scope.row.projectStatus === 0
                ? "已拒绝"
                : scope.row.projectStatus === 1
                ? "已创建"
                : scope.row.projectStatus === 2
                ? "已提交"
                : scope.row.projectStatus === 3
                ? "已通过"
                : ""
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
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
import cookies from "@/cookies";

export default {
  name: "iJoinedProject",
  data: () => {
    return {
      count: 0,
      page: 1,
      projectList: [],
      loading: false,
      // projectTypeList: [],
    };
  },
  methods: {
    page_change: function (val) {
      this.loading = true;
      this.page = val;
      projectApi
        .iJoinedProject({
          userId: cookies.GetCookiesUserId(),
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
          userId: cookies.GetCookiesUserId(),
        })
        .then((res) => {
          this.count = res.data;
          projectApi
            .iJoinedProject({
              userId: cookies.GetCookiesUserId(),
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
