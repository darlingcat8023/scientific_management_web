<template>
  <div id="registry">
    <div class="registry">
      <el-row>
        <el-col :span="4">
          <div class="left-box">
            <div class="title">
              <p>欢迎注册</p>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="right-box">
            <div class="content">
              <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="手机号">
                    <el-input
                      v-model="form.mobile"
                      placeholder="请输入用户名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="form.password"
                      placeholder="请输入密码"
                      type="password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input
                      v-model="form.confirmPassword"
                      placeholder="请再次输入密码"
                      type="password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入邮箱"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="身份证">
                    <el-input
                      v-model="form.idCard"
                      placeholder="请输入邮箱"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="研究方向">
                    <el-input
                      v-model="form.study"
                      placeholder="请输入邮箱"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="职位">
                    <el-radio-group v-model="form.type">
                      <el-radio-button label="1">老师</el-radio-button>
                      <el-radio-button label="2">学生</el-radio-button>
                    </el-radio-group>
                  </el-form-item>

                </el-form>
              </div>
              <div class="sumbit-box">
                <el-button @click="sumbit">注册</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "registry",
  data: () => {
    return {
      form: {}
    };
  },
  methods: {
    sumbit() {

    }
  }
};
</script>

<style scoped lang="less">
.registry {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}

.left-box {
  height: 100vh;
  background-color: cornflowerblue;

  .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;

    p {
      color: #fff;
      font-size: 20px;
      text-align: center;
      margin: 0 0 0 0;
    }
  }
}

.right-box {
  height: 100vh;
  background-color: #fff;
  display: block;
  padding: 20px;

  .content {
    margin-top: 10vh;
    height: 80vh;
    padding: 20px;
  }
}
</style>
