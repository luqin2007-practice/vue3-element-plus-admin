function testEmail(email: string): string | undefined {
  const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!email) {
    return "请输入邮箱";
  } else if (!regEmail.test(email)) {
    return "邮箱格式不正确";
  }
}

function testPassword(password: string): string | undefined {
  const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (!password) {
    return "请输入密码";
  } else if (!regPassword.test(password)) {
    return "密码位数应当为 6-20 位，包含数字、字母";
  }
}

function testConfirmPassword(
  password: string,
  confirm: string
): string | undefined {
  if (!confirm) {
    return "请再次输入密码";
  } else if (password !== confirm) {
    return "两次密码不一致";
  }
}

function testCode(code: string): string | undefined {
  const regCode = /^[a-z0-9]{6}$/;
  if (!regCode.test(code)) {
    return "验证码格式错误";
  }
}

function validate(result: string | undefined, callback: any) {
  if (result) {
    callback(new Error(result));
  } else {
    callback();
  }
}

export default {
  validate,
  testEmail,
  testPassword,
  testConfirmPassword,
  testCode,
};
