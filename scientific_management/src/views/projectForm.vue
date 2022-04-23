<template>
  <div id="project-form">
    <el-dialog title="项目" :visible.sync="dialogFormVisible" @close="cancel">
      <el-form ref="matchForm" :model="form" :rules="rules">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="学科分类" :label-width="formLabelWidth">
          <el-input
            v-model="form.projectType"
            :disabled="formId !== 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="研究方向" :label-width="formLabelWidth">
          <el-input v-model="form.researchDirection"></el-input>
        </el-form-item>
        <el-form-item label="项目预算" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.projectFund"
            :min="0"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="projectRemark" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.projectRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import projectApi from "@/api/project";
import cookies from "@/cookies";

export default {
  name: "ProjectForm",
  data: () => {
    return {
      dialogFormVisible: true,
      formLabelWidth: "120px",
      form: {
        projectName: "",
        projectType: "",
        researchDirection: "",
        projectFund: 0,
        projectRemark: "",
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        researchDirection: [
          { required: true, message: "请输入研究方向", trigger: "blur" },
        ],
        projectFund: [
          { required: true, message: "请输入项目预算", trigger: "blur" },
        ],
        projectRemark: [
          { required: true, message: "请输入项目备注", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    formId: {
      type: Number,
      default: 0,
    },
  },
  created() {
    if (this.formId !== 0) {
      this.form = this.data;
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$refs.matchForm.validate((valid) => {
        if (valid) {
          console.log(this.formId);
          if (this.formId) {
            projectApi.projectUpdate(this.form).then(() => {
              this.$emit("success");
              this.dialogFormVisible = false;
            });
          } else {
            this.form.creator = cookies.GetCookiesUserId();
            projectApi.createProject(this.form).then(() => {
              this.$emit("success");
              this.dialogFormVisible = false;
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
