var flatten = require('flat');

const zh_CN = {
  apiSuccess: {
    loginSuccess: "Login Success",
    logoutSuccess: "Logout Success",
    registerSuccess: "Register Success",
    changePwdSuccess: "Change Password Success",
    sendResetPwdVerifyCodeSuccess: "Verify Code Send",
    resetPwdSuccess: "Reset Password Success",
    addUserBankCardsSuccess: "Add Bank Card",
    sendUserBankCardsVerifyCodeSuccess: "Verify Code Send",
    userBankCardsVerifySuccess: "Add Bank Card Success",
    bonusesApplySuccess: "Apply Success",
    sendAccountVerifyCodeSuccess: "Verify Code Send",
    accountVerifySuccess: "Account Verify Success",
    changeUserNotificationStatusSuccess: "Status Change Success",
    updateUserProfileSuccess: "Profile Update Success",
    userWithdrawSuccess: "Withdraw Success",
    userDepositSuccess: "Deposit Success"
  },
  apiFail: {
    operateFail: "Error, please try again",
    timeoutFail: "Time out, please try again",
    loginFail: {
      infoFail: "Account or Password fail",
    }
  }
};

export default flatten(zh_CN);