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
                <el-form
                  ref="form"
                  :model="form"
                  :rules="rules"
                  label-width="80px"
                >
                  <el-form-item label="姓名">
                    <el-input
                      v-model="form.userName"
                      placeholder="请输入姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input
                      v-model="form.userMobile"
                      placeholder="请输入手机号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="form.userPassword"
                      placeholder="请输入密码"
                      type="password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="身份证">
                    <el-input
                      v-model="form.userIdentity"
                      placeholder="请输入身份证"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="用户类型">
                    <el-radio-group v-model="form.userType">
                      <el-radio-button label="1">老师</el-radio-button>
                      <el-radio-button label="0">学生</el-radio-button>
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
import userApi from "@/api/user";

export default {
  name: "registry",
  data: () => {
    return {
      form: {
        userName: "",
        userMobile: "",
        userPassword: "",
        userIdentity: "",
        userType: "",
        userExtend: "123",
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        userMobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6到12个字符",
            trigger: "blur",
          },
        ],
        userIdentify: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证号",
            trigger: "blur",
          },
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    sumbit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.userType = this.form.userType === "1" ? 1 : 0;
          userApi.registry(this.form).then((res) => {
            console.log(res);
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push("/login");
          });
        } else {
          this.$message({
            type: "error",
            message: "请检查表单",
          });
        }
      });
    },
  },
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
