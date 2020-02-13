var flatten = require('flat');

const zh_CN = {
  apiSuccess: {
    loginSuccess: "登录成功",
    logoutSuccess: "登出成功",
    registerSuccess: "注册成功",
    changePwdSuccess: "密码变更成功",
    sendResetPwdVerifyCodeSuccess: "验证码已发送",
    resetPwdSuccess: "密码重设成功",
    addUserBankCardsSuccess: "添加使用者银行卡成功",
    sendUserBankCardsVerifyCodeSuccess: "验证码已发送",
    userBankCardsVerifySuccess: "银行卡验证成功",
    bonusesApplySuccess: "优惠申请成功",
    sendAccountVerifyCodeSuccess: "验证码已发送",
    accountVerifySuccess: "帐号验证成功",
    changeUserNotificationStatusSuccess: "用户信件状态更改成功",
    updateUserProfileSuccess: "使用者资讯更新成功",
    userWithdrawSuccess: "出款成功",
    userDepositSuccess: "入款成功"
  },
  apiFail: {
    operateFail: "操作错误,请重新操作",
    timeoutFail: "操作逾时,请重新操作",
    loginFail: {
      infoFail: "帐号密码有误",
    }
  }
};

export default flatten(zh_CN);