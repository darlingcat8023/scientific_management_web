<template>
  <div id="index">
    <div class="index">
      <el-row>
        <el-col :span="4">
          <div class="left-box">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              background-color="#e4e7ed"
            >
              <el-submenu index="project">
                <template slot="title">
                  <span>项目管理</span>
                </template>
              </el-submenu>
              <el-submenu index="i-created-project">
                <template slot="title">
                  <span>我创建的</span>
                </template>
              </el-submenu>
              <el-submenu index="i-join-project">
                <template slot="title">
                  <span>我参加的</span>
                </template>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="right-box" v-if="reload">
            <div v-if="activeIndex === 'project'">
              <p>欢迎使用</p>
            </div>
            <div v-if="activeIndex === 'i-created-project'">
              <i-created-project />
            </div>
            <div v-if="activeIndex === 'i-join-project'">
              <i-joined-project />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import iCreatedProject from "./iCreatedProject.vue";
import iJoinedProject from "./iJoinedProject.vue";

export default {
  name: "index",
  data() {
    return {
      activeIndex: "project",
      reload: true,
    };
  },
  components: {
    iCreatedProject,
    iJoinedProject,
  },
  methods: {
    handleOpen(key) {
      this.activeIndex = key;
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      });
    },
  },
};
</script>

<style scoped lang="less">
.user {
  width: 100vw;
  height: 100vh;
}

.left-box {
  height: 100vh;
  background-color: cornflowerblue;

  .el-menu-vertical-demo {
    height: 100vh;
  }
}

.right-box {
  height: 100vh;
  background-color: #fff;
  display: block;
  padding: 20px;
}
</style>
