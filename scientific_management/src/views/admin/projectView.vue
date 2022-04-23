<template>
  <el-dialog title="项目详情" :visible.sync="dialogFormVisible" @close="cancel">
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label"> 项目名称 </template>
        {{ projectData.projectName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 项目类型 </template>
        {{ projectData.projectType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 研究方向 </template>
        {{ projectData.researchDirection }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 状态 </template>
        <el-tag
          :type="
            projectData.projectStatus === 0
              ? 'error'
              : projectData.projectStatus === 1
              ? 'info'
              : projectData.projectStatus === 2
              ? 'info'
              : projectData.projectStatus === 3
              ? 'success'
              : ''
          "
        >
          {{
            projectData.projectStatus === 0
              ? "已拒绝"
              : projectData.projectStatus === 1
              ? "已创建"
              : projectData.projectStatus === 2
              ? "已提交"
              : projectData.projectStatus === 3
              ? "已通过"
              : ""
          }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "projectView",
  data: () => {
    return {
      dialogFormVisible: true,
    };
  },
  props: {
    projectData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped></style>
