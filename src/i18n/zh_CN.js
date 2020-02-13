var flatten = require('flat');

const zh_CN = {
  maintain: "维护中",
  comingSoon: "即将推出",
  account: "帐号",
  password: "密码",
  china: "中国",
  hello: "您好, ",
  news: "公告",
  all: "全部",
  send: "送出",
  next: "下一步",
  email: "电子邮箱",
  phone: "电话",
  select: "请选择",
  noData: "暂无资料",
  unread: "未读讯息",
  agree: "同意",
  aboutUs: "关于我们",
  privacy: "隐私政策",
  disclaimer: "免责条款",
  rationalBetting: "理性博彩",
  terms: "服务条款",
  check: "确认",
  reSend: "重寄",
  resetPwdSuccess: "您的密码已修改成功",
  language: {
    title: "语言",
    zh_cn: "简体中文",
    en: "English"
  },
  dialogMsg: {
    check: "确认",
    cancel: "取消"
  },
  login: "登录",
  unLogin: "未登录，请先登录帐号",
  forgetPwd: "忘记密码",
  logout: "登出",
  formatErr: {
    account: "帐号格式或长度不符",
    password: "密码格式或长度不符",
    noMatch: "密码不同",
    referralCode: "推荐码不可为空",
    emailNull: "电子邮箱不可为空",
    phoneNull: "电话不可为空",
    inputNull: "栏位不可为空"
  },
  register: {
    title: "注册",
    placeholder: {
      account: "帐号4-10字母、数字",
      password: "密码4-12字母、数字",
      passwordConfirmation: "再次输入密码",
      referralCode: "推薦碼"
    }
  },
  navBar: {
    home: "首页",
    casino: "真人娱乐",
    sport: "体育博彩",
    slot: "电子游戏",
    poker: "棋牌",
    eSport: "电竞",
    lottery: "彩票",
    horseRacing: "赛马",
    cockFighting: "斗鸡",
    fish: "捕鱼"
  },
  changePwd: {
    title: "修改密码",
    oldPassword: "请输入旧密码",
    newPassword: "请输入新密码",
    confirmPassword: "请再次输入密码"
  },
  verificate: {
    title: "验证帐号",
    subTitle: "请验证帐号，开通张户",
    placeholder: {
      phoneNum: "手机号",
      verificateCode: "验证码"
    },
    phoneNum: "手机号",
    verificateCode: "验证码",
    getVerificateCode: "获取验证码",
    verificate: "验证",
    verifySendTo: "验证码已送至",
    sendSuccess: "验证码已发送",
    leaveMsg: "您尚未开通此帐号，确定要离开此画面？",
    inputVerifyCode: "请输入验证码"
  },
  memberMenu: {
    myWallet: "我的錢包",
    bankCard: "银行卡",
    history: "历史纪录",
    center: "基本資訊",
    message: "会员通知",
    validBets: "投注纪录",
    mainCredits: "帐户纪录",
    mainOrders: "存取纪录",
    gameOrder: "转帐纪录",
    bonuses: "紅利纪录",
    changePwd: "修改密码"
  },
  wallet: {
    mainBalance: "主钱包余额",
    gameBalance: "游戏钱包余额",
    deposit: "存款",
    withdraw: "取款",
    gameTransfer: "游戏转帐",
    transferToGame: "转入游戏",
    transferToMain: "转回主钱包",
    mainWallet: "主钱包",
    gameWallet: "游戏钱包",
    amount: "金額",
    amountIssue: "转入金额异常",
    checkTransfer: "确定转入？",
    transferSuccess: "转入成功"
  },
  bankCard: {
    bankcardAmount: "银行卡张数",
    newBankcard: "新增银行卡",
    channelDetailInfo: "渠道详细资料",
    bankName: "银行名称",
    province: "銀行省份",
    area: "城市/地区",
    branch: "支行",
    accountNum: "帐户号码",
    accountName: "户名",
    checkAdd: "确认新增",
    verifyBankcard: "银行卡验证"
  },
  deposit: {
    channel: "支付渠道",
    singleAmount: "单笔金额",
    selectCannel: "选择渠道",
    amount: "存款金额",
    sumbit: "存款",
    amountIssue: "输入金额不符合单笔金额",
    currency: "货币",
    transfer: "交易方式",
    account: "帐号",
    bank: "银行",
    notice: "备注",
    transferMethod: {
      cash: "现金",
      remit: "汇款",
      internet: "网路银行",
      atm: "ATM"
    },
    dataInfoIssue: "资料输入不齐全"
  },
  withdraw: {
    noUserBankCard: "未设定绑定银行",
    condition: {
      _1: "1. 添加银行卡",
      _2: "2. 填写正确的银行卡信息",
      _3: "3. 确认后送出信息",
      _4: "4. 完成绑定银行卡后即可申请取款"
    },
    addBankcard: "设定银行卡",
    withdrawAmount: "今日可取款余额",
    amount: "取款金额"
  },
  game: {
    unLogin: "请先登录",
    start: "开始游戏"
  },
  history: {
    bets: "投注",
    mainCredits: "帐户",
    mainOrders: "存取款",
    gameOrder: "游戏转帐",
    bonuses: "紅利",
    search: "搜索",
    time: "时间",
    serialNum: "单号",
    name: "名称",
    orderStatus: "注单状态",
    validBets: "有效投注",
    betsAmount: "投注金額",
    winLost: "输赢",
    detail: "详细结果",
    transferType: "交易类别",
    amount: "金额",
    transfered: "交易后",
    remark: "备注",
    status: "状态",
    bonusesName: "優惠名稱",
    appliedDay: "申請日"
  },
  center: {
    birth_day: "出生日期",
    name: "姓名",
    qq: "QQ",
    wechat: "微信",
    main_wallet: "主钱包",
    id_number: "身份证字号"
  },
  notification: {
    unread: "未读",
    detail: "详细讯息"
  },
  faq: {
    title: "常见问题",
    account: "帐户问题",
    safety: "安全问题",
    deposit: "存款问题",
    withdraw: "取款问题",
    noData: "暂无资料"
  },
  bonuses: {
    title: "优惠活动",
    noData: "暂无优惠",
    activeTime: "活动时间",
    moreBtn: "查看详情",
    showTime: "{start} 至 {end}",
    forever: "永久开放",
    applyState: {
      auto: "无需申请",
      cs: "请连系客服申请",
      agent: "请连系代理申请",
      manual: "申请",
      applied: "已申请"
    }
  },
  privacy: "隐私政策",
  disclaimer: "免責聲明",
  memberCentral: "会员中心",
  goGame: "进入游戏",
  status: {
    processing: "处理中",
    fail: "失败",
    success: "成功"
  }
};

export default flatten(zh_CN);