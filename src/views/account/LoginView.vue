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
    <el-form label-width="80px" :ref="form" :model="form" :rules="form_rules">
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
            <el-button class="el-button-block" type="success">
              获取验证码
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="el-button-block" type="danger" @click="submit">
          {{ current_menu === "login" ? "登陆" : "立即加入" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { toRefs, reactive, getCurrentInstance } from "vue";
import {
  validate,
  validate_email,
  validate_password,
  validate_confirm_password,
  validate_code,
} from "@/utils/validate";

export default {
  setup(prop, { root }) {
    const { ctx, proxy } = getCurrentInstance();
    console.log(ctx);
    console.log(proxy);

    // 校验函数
    const validator_username = (_, username, callback) => {
      validate(validate_email(username), callback);
    };

    const validator_password = (_, password, callback) => {
      validate(validate_password(password), callback);
    };

    const validator_confirm_password = (_, confirm, callback) => {
      const message = validate_confirm_password(data.form.password, confirm);
      validate(message, callback);
    };

    const validator_code = (_, code, callback) => {
      validate(validate_code(code), callback);
    };

    const data = reactive({
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
      form_rules: {
        username: [{ validator: validator_username, trigger: "change" }],
        password: [{ validator: validator_password, trigger: "change" }],
        confirmpassword: [
          { validator: validator_confirm_password, trigger: "change" },
        ],
        code: [{ validator: validator_code, trigger: "change" }],
      },
    });

    const toggleMenu = (type) => (data.current_menu = type);

    const dataItem = toRefs(data);

    return { toggleMenu, ...dataItem };
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
  font-size: 14px;
}
</style>
