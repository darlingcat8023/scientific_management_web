<template>
  <div>
    <el-table :data="projectList">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="项目名称" prop="projectName"></el-table-column>
      <el-table-column label="项目类型" prop="projectType"></el-table-column>
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handlerView(scope.row)"
            >查看信息
          </el-button>
          <el-button type="text" size="small" @click="handlerHumen(scope.row)"
            >查看人员
          </el-button>
          <el-button type="text" size="small" @click="handlerPass(scope.row)"
            >通过
          </el-button>
          <el-button type="text" size="small" @click="handlerReject(scope.row)"
            >拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="20"
      :total="count"
      @current-change="page_change"
      :current-page="page"
    />
    <project-view
      :project-data="projectData"
      @cancel="hanlderCloseView"
      v-if="projectViewEnable"
    ></project-view>
    <project-humen
      :project-id="project_id"
      @cancel="handlerCloseHumen"
      v-if="humenViewEnable"
    ></project-humen>
  </div>
</template>

<script>
import adminApi from "../../api/admin.js";
import cookies from "@/cookies";
import ProjectView from "./projectView";
import ProjectHumen from "@/views/admin/projectHumen";

export default {
  name: "totalList",
  data: () => {
    return {
      project_id: 0,
      projectList: [],
      count: 0,
      page: 1,
      projectViewEnable: false,
      humenViewEnable: false,
      projectData: {},
    };
  },
  components: {
    ProjectView,
    ProjectHumen,
  },
  methods: {
    handlerPass(row) {
      this.$prompt("请输入通过原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.*/,
        inputErrorMessage: "请输入通过原因",
      }).then(({ value }) => {
        adminApi
          .projectPass({
            projectId: row.id,
            auditUserId: cookies.GetCookiesUserId(),
            comment: value,
          })
          .then(() => {
            this.$message.success("操作成功");
            this.getData();
          });
      });
    },
    handlerReject(row) {
      this.$prompt("请输入拒绝原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.*/,
        inputErrorMessage: "请输入拒绝原因",
      }).then(({ value }) => {
        adminApi
          .projectReject({
            projectId: row.id,
            auditUserId: cookies.GetCookiesUserId(),
            comment: value,
          })
          .then(() => {
            this.$message.success("操作成功");
            this.getData();
          });
      });
    },
    handlerHumen(row) {
      this.project_id = row.id;
      this.humenViewEnable = true;
    },
    handlerCloseHumen() {
      this.humenViewEnable = false;
      this.project_id = 0;
    },
    handlerView(row) {
      this.projectData = row;
      this.projectViewEnable = true;
    },
    hanlderCloseView() {
      this.projectViewEnable = false;
      this.projectData = {};
    },
    page_change(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      adminApi
        .projectCount({ userId: cookies.GetCookiesUserId() })
        .then((res) => {
          this.count = res.data;
          adminApi
            .projectList({
              userId: cookies.GetCookiesUserId(),
              page: this.page,
            })
            .then((res) => {
              this.projectList = res.data;
            });
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped></style>
