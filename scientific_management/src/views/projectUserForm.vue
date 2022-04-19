<template>
  <div id="form">
    <el-dialog
      title="人员管理"
      :visible.sync="dialogFormVisible"
      @close="cancel"
    >
      <el-row>
        <el-button @click="addTeacher">添加导师</el-button>
      </el-row>
      <el-row
        v-for="(item, key) in projectTeacherList"
        :key="key"
        style="margin-top: 16px"
      >
        <el-col :span="8">
          <el-select v-model="item.data">
            <el-option
              v-for="(item, key) in teacherList"
              :key="key"
              :label="item.userName"
              :value="`${item.userId}-${item.userName}`"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="danger" @click="removeTeacher(key)">删除</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-button @click="addStudent">添加学生</el-button>
      </el-row>
      <el-row
        v-for="(item, key) in projectStudentList"
        :key="key"
        style="margin-top: 16px"
      >
        <el-col :span="8" :offset="4">
          <el-select v-model="item.data">
            <el-option
              v-for="(item, key) in studentList"
              :key="key"
              :label="item.userName"
              :value="`${item.userId}-${item.userName}`"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="danger" @click="removeStudent(key)">删除</el-button>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
      userList: [],
      teacherList: [],
      studentList: [],
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
    submit() {
      let data = [];
      for (let i = 0; i < this.projectTeacherList.length; i++) {
        data.push({
          userId: this.convertToNumber(
            this.projectTeacherList[i].data.split("-")[0]
          ),
          userName: this.projectTeacherList[i].data.split("-")[1],
          userRole: 1,
        });
      }
      for (let i = 0; i < this.projectStudentList.length; i++) {
        data.push({
          userId: this.convertToNumber(
            this.projectStudentList[i].data.split("-")[0]
          ),
          userName: this.projectStudentList[i].data.split("-")[1],
          userRole: 0,
        });
      }
      projectApi.updateProjectUser(this.projectId, data).then(() => {
        this.$emit("success");
      });
    },
    addTeacher() {
      this.projectTeacherList.push({
        name: "",
        role: 0,
      });
    },
    removeTeacher(index) {
      projectApi.deleteProjectUser(this.projectId, [
        this.projectTeacherList[index].id,
      ]);
      this.projectTeacherList.splice(index, 1);
    },
    addStudent() {
      this.projectStudentList.push({
        name: "",
        role: 1,
      });
    },
    removeStudent(index) {
      projectApi.deleteProjectUser(this.projectId, [
        this.projectStudentList[index].id,
      ]);
      this.projectStudentList.splice(index, 1);
    },
    getData() {
      projectApi
        .projectUser({ projectId: this.projectId, userRole: 0 })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.projectTeacherList.push({
              data: `${res.data[i].userId}-${res.data[i].userName}`,
              role: 0,
              id: res.data[i].id,
            });
          }
        });
      projectApi
        .projectUser({ projectId: this.projectId, userRole: 1 })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.projectStudentList.push({
              data: `${res.data[i].userId}-${res.data[i].userName}`,
              role: 1,
              id: res.data[i].id,
            });
          }
        });
      userApi.userList({ userType: 0 }).then((res) => {
        this.studentList = res.data;
      });
      userApi.userList({ userType: 1 }).then((res) => {
        this.teacherList = res.data;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped></style>
