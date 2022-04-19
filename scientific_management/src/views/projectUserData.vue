<template>
  <div id="form">
    <el-dialog
      title="人员管理"
      :visible.sync="dialogFormVisible"
      @close="cancel"
    >
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
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import projectApi from "@/api/project";
import userApi from "@/api/user";

export default {
  name: "form",
  data: () => {
    return {
      dialogFormVisible: true,
      projectStudentList: [],
      projectTeacherList: [],
    };
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    // convert string to number
    convertToNumber(str) {
      return Number(str.split("-")[0]);
    },
    cancel() {
      this.$emit("cancel");
    },
    getData() {
      projectApi
        .projectUser({ projectId: this.projectId, userRole: 0 })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            userApi
              .userDetail({ userId: res.data[i].userId })
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
            userApi
              .userDetail({ userId: res.data[i].userId })
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
