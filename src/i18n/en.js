var flatten = require('flat');

const en = {
  maintain: "Maintain",
  comingSoon: "Coming Soon",
  account: "Account",
  password: "Password",
  china: "china",
  hello: "Hello, ",
  news: "News",
  all: "All",
  send: "Submit",
  next: "Next",
  email: "Email",
  phone: "Phone",
  select: "Select",
  noData: "No Data",
  unread: "UnRead",
  agree: "Agree",
  aboutUs: "AboutUs",
  privacy: "Privacy",
  disclaimer: "Disclaimer",
  rationalBetting: "Rational Betting",
  terms: "Terms",
  check: "Check",
  reSend: "Re-Send",
  resetPwdSuccess: "Reset Password Success",
  language: {
    title: "Language",
    zh_cn: "简体中文",
    en: "English"
  },
  dialogMsg: {
    check: "Ok",
    cancel: "Cancel"
  },
  login: "LogIn",
  unLogin: "Not logged in, please log in first",
  forgetPwd: "Forget Password",
  logout: "LogOut",
  formatErr: {
    account: "Account format or length does not match",
    password: "Password format or length does not match",
    noMatch: "Different passwords",
    referralCode: "Recommendation code cannot be empty",
    emailNull: "Email cannot be empty",
    phoneNull: "Phone cannot be empty",
    inputNull: "Field cannot be empty"
  },
  register: {
    title: "Register",
    placeholder: {
      account: "Account number 4-10 letters, numbers",
      password: "Password 4-12 letters, numbers",
      passwordConfirmation: "Enter the password again",
      referralCode: "Referral Code"
    }
  },
  navBar: {
    home: "Home",
    casino: "Casino",
    sport: "Sports",
    slot: "Slots",
    poker: "Poker",
    eSport: "eSports",
    lottery: "Lottery",
    horseRacing: "Horse Racing",
    cockFighting: "Cock Fighting",
    fish: "Fish"
  },
  changePwd: {
    title: "Change Password",
    oldPassword: "Please enter the old password",
    newPassword: "Please enter a new password",
    confirmPassword: "Please enter the password again"
  },
  verificate: {
    title: "Verify account",
    subTitle: "Please verify your account and open an account",
    placeholder: {
      phoneNum: "phone number",
      verificateCode: "Verification code"
    },
    phoneNum: "phone number",
    verificateCode: "Verification code",
    getVerificateCode: "Get verification code",
    verificate: "Verification",
    verifySendTo: "Verify Code Send To",
    sendSuccess: "Verification code sent",
    leaveMsg: "You have not opened this account. Are you sure you want to leave this screen?",
    inputVerifyCode: "Please input verify code"
  },
  memberMenu: {
    myWallet: "My Wallet",
    bankCard: "bank card",
    history: "History",
    center: "Center",
    message: "Message",
    validBets: "Bets History",
    mainCredits: "Account History",
    mainOrders: "Deposit / withdraw History",
    gameOrder: "Transfer History",
    bonuses: "Bonuses History",
    changePwd: "Change Password"
  },
  wallet: {
    mainBalance: "Wallet balance",
    gameBalance: "Game Wallet balance",
    deposit: "Deposit",
    withdraw: "Withdraw",
    gameTransfer: "Transfer",
    transferToGame: "Transfer To Game",
    transferToMain: "Transfer To Wallet",
    mainWallet: "Main Wallet",
    gameWallet: "Game Wallet",
    amount: "Amount",
    amountIssue: "The transfer amount is abnormal",
    checkTransfer: "Are you sure to transfer?",
    transferSuccess: "Transfer success"
  },
  bankCard: {
    bankcardAmount: "Number of bank cards",
    newBankcard: "Add bank card",
    channelDetailInfo: "Detail Info",
    bankName: "Bank Name",
    province: "Province",
    area: "Area",
    branch: "Branch",
    accountNum: "Account",
    accountName: "User Name",
    checkAdd: "Add",
    verifyBankcard: "BankCard Verify"
  },
  deposit: {
    channel: "Payment channel",
    singleAmount: "Single amount",
    selectCannel: "Choose a channel",
    amount: "Amount",
    sumbit: "Deposit",
    amountIssue: "The entered amount does not match the single amount",
    currency: "Currency",
    transfer: "Means of Transaction",
    account: "Account",
    bank: "Bank",
    notice: "Remark",
    transferMethod: {
      cash: "Cash",
      remit: "Money Transfer",
      internet: "Online Banking",
      atm: "ATM"
    },
    dataInfoIssue: "Incomplete data entry"
  },
  withdraw: {
    noUserBankCard: "No bank is set",
    condition: {
      _1: "1. Add bank card",
      _2: "2. Fill the correct information",
      _3: "3. Send message after confirmation",
      _4: "4. Apply for withdrawal after completing bank card binding"
    },
    addBankcard: "Set up a bank card",
    withdrawAmount: "Today's withdrawal balance",
    amount: "Withdrawal amount"
  },
  game: {
    unLogin: "please LogIn",
    start: "Start"
  },
  history: {
    bets: "Bet",
    mainCredits: "Account",
    mainOrders: "Deposit / withdraw",
    gameOrder: "Transfer",
    bonuses: "Bonuses",
    search: "Search",
    time: "Time",
    serialNum: "Order Num",
    name: "Name",
    orderStatus: "Status",
    validBets: "Valid Bets",
    betsAmount: "Bets Amount",
    winLost: "Win / Lose",
    detail: "Detail",
    transferType: "Type",
    amount: "Amount",
    transfered: "After the transaction",
    remark: "Remark",
    status: "Status",
    bonusesName: "Bonuses Name",
    appliedDay: "Applied Day"
  },
  center: {
    birth_day: "Birthday",
    name: "Name",
    qq: "QQ",
    wechat: "Wechat",
    main_wallet: "Main Wallet",
    id_number: "ID"
  },
  notification: {
    unread: "Un-read",
    detail: "Detail"
  },
  faq: {
    title: "FAQ",
    account: "Account",
    safety: "Safety",
    deposit: "Deposit",
    withdraw: "Withdraw",
    noData: "No Data"
  },
  bonuses: {
    title: "Bonuses",
    noData: "No Bonuses",
    activeTime: "Active Time",
    moreBtn: "MORE",
    showTime: "{start} to {end}",
    forever: "Forever",
    applyState: {
      auto: "No need to apply",
      cs: "Please contact customer service application",
      agent: "Please contact the agent to apply",
      manual: "Apply",
      applied: "Applied"
    }
  },
  privacy: "Privacy",
  disclaimer: "Disclaimer",
  memberCentral: "Member Central",
  goGame: "Go Game",
  status: {
    processing: "Processing",
    fail: "Fail",
    success: "Success"
  }
};

export default flatten(en);