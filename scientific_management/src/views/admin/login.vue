<template>
  <div id="user">
    <div class="user">
      <el-row>
        <el-col :span="14">
          <div class="left-box">
            <div class="logo">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="logo"
              />
            </div>
            <div class="desc">
              <h2>欢迎使用</h2>
              <p>项目管理平台</p>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="right-box">
            <div class="user-title">
              <h2>欢迎登录</h2>
            </div>
            <div class="user-form">
              <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="0px"
              >
                <el-form-item prop="account">
                  <el-input
                    v-model="form.account"
                    placeholder="帐号"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import adminApi from "@/api/admin";
import cookiesUtils from "@/cookies";

export default {
  name: "user",
  data: () => {
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          adminApi.login(this.form).then((res) => {
            console.log("res ", res.data);
            cookiesUtils.SetCookiesToken(res.data.token);
            cookiesUtils.SetCookiesUserId(res.data.userId);
            cookiesUtils.SetCookiesUserType("admin");
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$router.push("/");
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    cookiesUtils.DeleteCookies();
  },
};
</script>

<style scoped lang="less">
.user {
  width: 100vw;
  height: 100vh;
}

.left-box {
  border-radius: 4px;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    text-align: center;
    padding-top: 50px;

    img {
      width: 100px;
    }
  }

  .desc {
    text-align: center;
    padding-top: 20px;

    h2 {
      color: #fff;
      font-size: 24px;
    }

    p {
      color: #fff;
      font-size: 14px;
    }
  }
}

.right-box {
  border-radius: 4px;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  .user-title {
    padding: 20px;

    .user-title h2 {
      font-size: 30px;
      font-weight: bold;
      color: #333;
    }
  }

  .user-form {
    padding: 20px;
  }

  .forget-pass {
    padding: 20px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: #333;
      font-size: 14px;
    }
  }
}
</style>
