<template>
  <el-dialog title="项目人员" :visible.sync="dialogFormVisible" @close="cancel">
    <el-row>
      <span>导师</span>
    </el-row>
    <el-row>
      <el-table :data="projectTeacherList">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.userData.userName }}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            {{ scope.row.userData.userMobile }}
          </template>
        </el-table-column>
        <el-table-column label="身份证">
          <template slot-scope="scope">
            {{ scope.row.userData.userIdentity }}
          </template>
        </el-table-column>
        <el-table-column label="附加信息">
          <template slot-scope="scope">
            {{ scope.row.userData.userExtend }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <span>学生</span>
    </el-row>
    <el-row>
      <el-table :data="projectStudentList">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.userData.userName }}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            {{ scope.row.userData.userMobile }}
          </template>
        </el-table-column>
        <el-table-column label="身份证">
          <template slot-scope="scope">
            {{ scope.row.userData.userIdentity }}
          </template>
        </el-table-column>
        <el-table-column label="附加信息">
          <template slot-scope="scope">
            {{ scope.row.userData.userExtend }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import projectApi from "@/api/project";
import adminApi from "@/api/admin";

export default {
  name: "projectHumen",
  data: () => {
    return {
      dialogFormVisible: true,
      projectTeacherList: [],
      projectStudentList: [],
    };
  },
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    getData() {
      projectApi
        .projectUser({ projectId: this.projectId, userRole: 0 })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            adminApi
              .accountInfo({ userId: res.data[i].userId })
              .then((detailRes) => {
                this.projectTeacherList.push({
                  data: `${res.data[i].userId}-${res.data[i].userName}`,
                  role: 0,
                  id: res.data[i].id,
                  userData: detailRes.data,
                });
              });
          }
        });
      projectApi
        .projectUser({ projectId: this.projectId, userRole: 1 })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            adminApi
              .accountInfo({ userId: res.data[i].userId })
              .then((detailRes) => {
                this.projectStudentList.push({
                  data: `${res.data[i].userId}-${res.data[i].userName}`,
                  role: 1,
                  id: res.data[i].id,
                  userData: detailRes.data,
                });
              });
          }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped></style>
