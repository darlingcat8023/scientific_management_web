<template>
  <div id="i-created-project">
    <div class="header">
      <H2>我创建的项目</H2>
    </div>
    <el-divider />
    <div style="text-align: left">
      <el-button type="primary" @click="createProject">创建项目</el-button>
    </div>

    <el-divider />
    <div style="text-align: left">
      <el-input
        v-model="projectName"
        placeholder="请输入项目名称"
        style="width: 156px"
        clearable
      ></el-input>
      <el-select v-model="projectLevel" placeholder="请选择项目等级"  style="width: 156px; margin-left: 16px">
        <el-option label="国家级项目" value="国家级项目"></el-option>
        <el-option label="省部级项目" value="省部级项目"></el-option>
        <el-option label="厅局级项目" value="厅局级项目"></el-option>
      </el-select>
      <el-select v-model="projectSource" placeholder="请选择项目来源" style="width: 156px; margin-left: 16px">
        <el-option label="自然科学类" value="自然科学类"></el-option>
        <el-option label="人文社科类" value="人文社科类"></el-option>
      </el-select>
      <el-select v-model="projectPriority" placeholder="请选择项目类别" style="width: 156px; margin-left: 16px">
        <el-option label="重大项目" value="重大项目"></el-option>
        <el-option label="重点项目" value="重点项目"></el-option>
        <el-option label="一般项目" value="一般项目"></el-option>
      </el-select>
      <el-select
        v-model="projectType"
        placeholder="请选择项目类型"
        style="width: 156px; margin-left: 16px"
        clearable
        filterable
      >
        <el-option
          v-for="(item, key) in projectTypeList"
          :key="key"
          :value="Object.values(item)[0]"
          :label="Object.values(item)[0]"
        ></el-option>
      </el-select>
      <el-select
        v-model="projectStatus"
        placeholder="请选择项目状态"
        style="width: 156px; margin-left: 16px"
        clearable
        filterable
      >
        <el-option label="已拒绝" value="0"></el-option>
        <el-option label="已创建" value="1"></el-option>
        <el-option label="已提交" value="2"></el-option>
        <el-option label="已通过" value="3"></el-option>
      </el-select>

      <el-input
        v-model="greaterThen"
        placeholder="预算区间"
        style="width: 156px; margin-left: 16px"
        clearable
      ></el-input>
      <el-input
        v-model="lessThen"
        placeholder="预算区间"
        style="width: 156px; margin-left: 16px"
        clearable
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchProject"
        style="margin-left: 16px"
        >搜索
      </el-button>
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
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑信息
          </el-button>
          <el-button type="text" size="small" @click="handleViewUser(scope.row)"
            >查看人员
          </el-button>
          <el-button type="text" size="small" @click="handleEditUser(scope.row)"
            >编辑人员
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handlerCommit(scope.row)"
            v-if="scope.row.enableCommit"
            >提交审核
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handlerAudit(scope.row)"
            v-if="!scope.row.enableCommit"
            >查看审核
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
    <project-form
      @success="formCallback"
      :data="formData"
      v-if="showForm"
      :formId="formId"
      @cancel="formCancel"
    ></project-form>
    <project-user-form
      @success="userFormCallback"
      :projectId="formId"
      v-if="showUserForm"
      @cancel="userFormCancel"
    ></project-user-form>
    <project-user-data
      :project-id="formId"
      v-if="showUserData"
      @cancel="userDataCancel"
    ></project-user-data>
    <project-audit
      :formId="formId"
      @cancel="closeAudit"
      v-if="showAudit"
    ></project-audit>
  </div>
</template>

<script>
import projectApi from "@/api/project";
import ProjectForm from "@/views/projectForm";
import projectUserForm from "@/views/projectUserForm";
import projectUserData from "@/views/projectUserData";
import projectAudit from "@/views/projectAudit";
import cookies from "@/cookies";

export default {
  name: "iCreatedProject",
  components: {
    ProjectForm,
    projectUserForm,
    projectUserData,
    projectAudit,
  },
  data: () => {
    return {
      showUserData: false,
      showUserForm: false,
      formId: 0,
      showForm: false,
      formData: {},
      showAudit: false,
      count: 0,
      page: 1,
      projectList: [],
      loading: false,
      projectName: "",
      projectType: "",
      projectStatus: "",
      greaterThen: "",
      lessThen: "",
      projectTypeList: [],
      projectLevel:"",
      projectSource:"",
      projectPriority:""
    };
  },
  methods: {
    handlerAudit(row) {
      this.formId = row.id;
      this.showAudit = true;
    },
    closeAudit() {
      this.showAudit = false;
      this.formId = 0;
    },
    handlerCommit(row) {
      projectApi
        .commitProject({
          projectId: row.id,
          userId: cookies.GetCookiesUserId(),
        })
        .then(() => {
          this.$message.success("提交成功");
        });
    },
    createProject() {
      this.formId = 0;
      this.formData = {};
      this.showForm = true;
    },
    handleViewUser(row) {
      this.formId = row.id;
      this.showUserData = true;
    },
    userDataCancel() {
      this.showUserData = false;
    },
    handleEditUser(row) {
      this.formId = row.id;
      this.showUserForm = true;
    },
    userFormCallback() {
      this.showUserForm = false;
      this.getData();
    },
    userFormCancel() {
      this.showUserForm = false;
    },
    formCancel() {
      this.showForm = false;
      this.formData = {};
    },
    handleEdit(row) {
      this.formId = row.id;
      this.formData = row;
      this.showForm = true;
    },
    formCallback() {
      this.showForm = false;
      this.getData();
    },
    page_change: function (val) {
      this.loading = true;
      this.page = val;
      projectApi
        .iCreatedProject({
          userId: cookies.GetCookiesUserId(),
          page: val,
          projectName: this.projectName,
          projectType: this.projectType,
          projectStatus: this.projectStatus,
          greaterThen: this.greaterThen,
          lessThen: this.lessThen,
        })
        .then((res) => {
          this.projectList = res.data;
          this.loading = false;
        });
    },
    searchProject() {
      this.getData();
    },
    getData() {
      this.loading = true;
      projectApi
        .iCreatedProjectCount({
          userId: cookies.GetCookiesUserId(),
          projectName: this.projectName,
          projectType: this.projectType,
          projectStatus: this.projectStatus,
          greaterThen: this.greaterThen,
          lessThen: this.lessThen,
        })
        .then((res) => {
          this.count = res.data;
          projectApi
            .iCreatedProject({
              userId: cookies.GetCookiesUserId(),
              page: this.page,
              projectName: this.projectName,
              projectType: this.projectType,
              projectStatus: this.projectStatus,
              greaterThen: this.greaterThen,
              lessThen: this.lessThen,
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
    projectApi.projectType().then((res) => {
      this.projectTypeList = res.data;
    });
  },
};
</script>

<style scoped lang="less">
.header {
  padding: 0px;
  text-align: left;
}
</style>
