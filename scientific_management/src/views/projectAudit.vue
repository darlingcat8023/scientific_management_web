<template>
  <div id="project-form">
    <el-dialog
      title="项目审核进度"
      :visible.sync="dialogFormVisible"
      @close="cancel"
    >
      <el-table :data="auditList">
        <el-table-column label="审核人" prop="auditUserName"></el-table-column>
        <el-table-column label="审核状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="error">已拒绝</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >已通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 1" type="warning"
              >待审核</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="step"></el-table-column>
        <el-table-column label="备注" prop="comment"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import projectApi from "@/api/project";

export default {
  name: "ProjectForm",
  data: () => {
    return {
      dialogFormVisible: true,
      auditList: [],
    };
  },
  props: {
    formId: {
      type: Number,
      default: 0,
    },
  },
  created() {
    projectApi.getProjectAuditList({ projectId: this.formId }).then((res) => {
      this.auditList = res.data;
    });
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped></style>
