<template>
  <div class="form-wrap">
    <ul class="menu-tab">
      <li
        v-for="item in tab_menu"
        :class="{ current: current_menu === item.type }"
        :key="item.type"
        @click="toggleMenu(item.type)"
      >
        {{ item.label }}
      </li>
    </ul>
    <el-form
      label-width="80px"
      ref="account_form"
      :model="form"
      :rules="form_rules"
    >
      <el-form-item prop="username">
        <label class="form-label">用户名</label>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label class="form-label">密码</label>
        <el-input
          type="password"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmpassword" v-if="current_menu === 'register'">
        <label class="form-label">确认密码</label>
        <el-input
          type="password"
          v-model="form.confirmpassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <label class="form-label">验证码</label>
        <el-row :gutter="10">
          <el-col :span="14">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="10">
            <el-button
              class="el-button-block"
              type="success"
              @click="getCode"
              :disable="code_btn_state.disable"
              :loading="code_btn_state.waiting_time > 0"
            >
              {{ getCodeButtonText() }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-button-block commit-button"
          type="danger"
          @click="submitForm"
          :disable="submit_btn_disable"
          :loading="submit_btn_loading"
        >
          {{ current_menu === "login" ? "登陆" : "立即加入" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <hr style="margin-top: 10px" />
  <div>
    <p style="color: white">测试用户名：<span>qweasd@123.com</span></p>
    <p style="color: white">测试密码：<span>qweasd123</span></p>
  </div>
</template>

<script>
import { toRefs, reactive, getCurrentInstance, onBeforeUnmount } from "vue";
import tester from "@/utils/validate";
import accountApi from "@/api/account";
import sha1 from "js-sha1";

export default {
  setup() {
    const { proxy } = getCurrentInstance();

    // 校验函数
    const validatorUsername = (_, username, callback) => {
      tester.validate(tester.testEmail(username), callback);
    };

    const validatorPassword = (_, password, callback) => {
      tester.validate(tester.testPassword(password), callback);
    };

    const validatorConfirmPassword = (_, confirm, callback) => {
      const message = tester.testConfirmPassword(data.form.password, confirm);
      tester.validate(message, callback);
    };

    const validatorCode = (_, code, callback) => {
      tester.validate(tester.testCode(code), callback);
    };

    const data = reactive({
      // 登陆、注册
      tab_menu: [
        { type: "login", label: "登陆" },
        { type: "register", label: "注册" },
      ],
      current_menu: "login",
      // 表单数据
      form: {
        username: "",
        password: "",
        confirmpassword: "",
        code: "",
      },
      // 表单校验
      form_rules: {
        username: [{ validator: validatorUsername, trigger: "change" }],
        password: [{ validator: validatorPassword, trigger: "change" }],
        confirmpassword: [
          { validator: validatorConfirmPassword, trigger: "change" },
        ],
        code: [{ validator: validatorCode, trigger: "change" }],
      },
      // 按钮状态
      code_btn_state: {
        disable: false,
        loaded: false,
        waiting_time: 0,
        timer: 0,
      },
      submit_btn_disable: true,
      submit_btn_loading: false,
    });

    const toggleMenu = (type) => (data.current_menu = type);

    /*
    const getCode = () => {
      // 测试错误连接
      accountApi.getError().catch((error) => {
        console.log(error);
        proxy.$message({
          message: error.message,
          type: "error",
        });
      });
    };
    */

    // 请求获取验证码
    const getCode = () => {
      // 验证码类型
      let module;
      if (data.current_menu === data.tab_menu[0].type) {
        module = data.tab_menu[0].type;
      } else {
        module = data.tab_menu[1].type;
      }
      // 验证用户名（邮箱）
      const userValidMessage = tester.testEmail(data.form.username);
      if (userValidMessage) {
        proxy.$message({
          message: userValidMessage,
          type: "error",
        });
        return;
      }
      // 请求验证码
      data.code_btn_state.disable = true;
      accountApi
        .getCode(data.form.username, module)
        .then((response) => {
          proxy.$message({
            message: response.data.message,
            type: "success",
          });
          // 等待，禁用发送按钮，防止多次重复发送验证码
          data.code_btn_state.disable = false;
          data.code_btn_state.loaded = true;
          data.code_btn_state.waiting_time = 60;
          data.code_btn_state.timer = window.setInterval(function () {
            data.code_btn_state.waiting_time--;
            if (data.code_btn_state.waiting_time === 0) {
              window.clearInterval(data.code_btn_state.timer);
              data.code_btn_state.timer = 0;
            }
          }, 1000);
        })
        .catch((error) => {
          // 请求失败
          proxy.$message({
            message: error.data.message,
            type: "error",
          });
          data.code_btn_state.disable = false;
        });
    };

    // 根据按钮状态生成按钮文本
    const getCodeButtonText = () => {
      if (data.code_btn_state.disable) {
        return "发送中";
      }
      if (data.code_btn_state.waiting_time > 0) {
        return `${data.code_btn_state.waiting_time}s 重试`;
      }
      if (data.code_btn_state.loaded) {
        return "再次获取";
      }
      return "获取验证码";
    };

    // 提交表单 登陆 or 注册
    const submitForm = () => {
      proxy.$refs.account_form.validate((valid) => {
        if (valid) {
          // 禁用提交按钮
          data.submit_btn_disable = true;
          data.submit_btn_loading = false;
          const username = data.form.username;
          const password = sha1(data.form.password);
          const code = data.form.code;
          // 清除按钮状态
          const reset_button_tatus = () => {
            // 释放提交按钮
            data.submit_btn_disable = false;
            data.submit_btn_loading = false;
            // 释放验证码按钮
            data.code_btn_state.disable = false;
            data.code_btn_state.waiting_time = 0;
            data.code_btn_state.loaded = false;
          };
          if (data.current_menu === "login") {
            // 提交登陆
            accountApi
              .login(username, password, code)
              .then((resp) => {
                // 登陆成功
                proxy.$message({
                  message: resp.data.message,
                  type: "success",
                });
                // 跳转到控制台
                proxy.$router.push({ name: "Home" });
              })
              .catch((error) => {
                // 登陆失败
                proxy.$message({
                  message: error.message,
                  type: "error",
                });
              })
              .finally(reset_button_tatus);
          } else {
            // 提交注册
            accountApi
              .register(username, password, code)
              .then((resp) => {
                // 注册成功
                proxy.$message({
                  message: resp.data.message,
                  type: "success",
                });
                // 跳转到登陆
                reset();
              })
              .catch((error) => {
                // 注册失败
                proxy.$message({
                  message: error.message,
                  type: "error",
                });
              })
              .finally(reset_button_tatus);
          }
        }
      });
    };

    const reset = () => {
      proxy.$refs.account_form.resetFields();
      data.current_menu = "login";
    };

    onBeforeUnmount(() => {
      // 清除验证码计时器
      if (data.code_btn_state.timer > 0) {
        clearInterval(data.code_btn_state.timer);
        data.code_btn_state.timer = 0;
      }
    });

    return {
      toggleMenu,
      getCode,
      getCodeButtonText,
      submitForm,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.form-wrap {
  width: 320px;
  padding-top: 100px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;

    &.current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.form-label {
  display: block;
  color: #fff;
  margin-top: 1.2em;
  font-size: 14px;
}

.commit-button {
  margin-top: 1.5em;
}
</style>
