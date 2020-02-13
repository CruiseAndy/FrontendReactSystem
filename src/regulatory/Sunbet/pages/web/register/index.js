/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  getCommunityPreload,
  userSignup,
  sendVerifyCode,
  userConfirmAccount,
  setUserToken,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

import "./index.scss";

const Register = props => {

  const registerStructure = {
    account: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.account"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.account"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    password: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.password"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.password"}),
      wrongStatus: false,
      type: "password",
      value: ""
    },
    password_confirmation: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.confirmPwd"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.confirmPwd"}),
      wrongStatus: false,
      type: "password",
      value: ""
    },
    email: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.email"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.email"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    name: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.name"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.name"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    id_number: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.idNum"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.idNum"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    qq: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.qq"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.qq"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    wechat: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.wechat"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.wechat"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    birth_day: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.birthDay"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.birthDay"}),
      wrongStatus: false,
      type: "calendar",
      value: ""
    },
    phone: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.phone"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.phone"}),
      wrongStatus: false,
      type: "text",
      value: ""
    },
    referral_code: {
      placeholder: props.intl.formatMessage({id: "register.placeholder.referralCode"}),
      wrongMsg: props.intl.formatMessage({id: "register.wrongMsg.referralCode"}),
      wrongStatus: false,
      type: "text",
      value: ""
    }
  };

  const [ groupIndex, setGroupIndex ] = useState(0);
  const [ registerColumn, setRegisterColumn ] = useState(null);
  const [ agreeTerms, setAgreeTerms ] = useState(false);
  const [ userEmail, setUserEmail ] = useState("");
  const [ verifyCode, setVerifyCode ] = useState("");
  const [ reSendCount, setReSendCount ] = useState(-1);

  const stepData = [
    props.intl.formatMessage({id: "register.step._1"}),
    props.intl.formatMessage({id: "register.step._2"}),
    props.intl.formatMessage({id: "register.step._3"})
  ];

  const mobileStepData = [
    props.intl.formatMessage({id: "register.mobileStep._1"}),
    props.intl.formatMessage({id: "register.mobileStep._2"}),
    props.intl.formatMessage({id: "register.mobileStep._3"})
  ];

	useEffect(() => {
    window.scrollTo(0, 0);
    
    props.getCommunityPreload(props.intl)
    .then(res => {
      let tmpData = {};

      Object.entries(res.register_column).map(item => {
        const [ key, data ] = item;
        tmpData[key] = { ...registerStructure[key], ...data };
      });

      setRegisterColumn(tmpData);
    });
  }, []);

	useEffect(() => {

    if (props.userLoginRlt && !props.userLoginRlt.user_confirmed) {
      setGroupIndex(1);
      return;
    }
  }, [props.userLoginRlt]);

  const registerInfoChange = (key, value) => {
    let tmpRegisterColumn = { ...registerColumn };

    tmpRegisterColumn[key].value = value;

    setRegisterColumn(tmpRegisterColumn);
  }

  const checkCondition = () => {
    let canRegister = true;

    Object.entries(registerColumn).map(item => {
      const [ key, data ] = item;

      if (data.status == "close" || data.on_signup != "true")
        return;
      
      let tmpRegisterColumn = { ...registerColumn };

      if ((data.status == "required" && key == "account" && (data.value.length < 4 || data.value.length > 10)) ||
          (data.status == "required" && key == "password" && (data.value.length < 4 || data.value.length > 20)) ||
          (data.status == "required" && data.value == "")) {
        tmpRegisterColumn[key].wrongStatus = true;
        canRegister = false;
      }
      else {
        tmpRegisterColumn[key].wrongStatus = false;
      }

      if (data.status == "required" && key == "password_confirmation" &&
          (registerColumn.password.value != registerColumn.password_confirmation.value)) {
        props.setGlobalErrMsg(props.intl.formatMessage({id: "formatErr.noMatch"}));
      }

      setRegisterColumn(tmpRegisterColumn);
    });

    if (!agreeTerms) {
      props.setGlobalErrMsg(props.intl.formatMessage({id: "formatErr.noAgree"}));
      canRegister = false;
    };

    return canRegister;
  }

  const registerSubmit = () => {
    if (!checkCondition())
      return;

    props.setGlobalSpinner(true);

    let apiParams = {};

    Object.entries(registerColumn).map(item => {
      const [ key, data ] = item;

      if (data.on_signup == "true") {
        apiParams[key] = data.value;
      }
    });

    props.userSignup(props.intl, apiParams)
    .then(res => {
      setGroupIndex(1);
      props.setGlobalSpinner(false);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
      props.setGlobalSpinner(false);
    })
  }
  
  const step1Layout = () => {
    return (
      <React.Fragment>
        <p className="process_info_title">{props.intl.formatMessage({id: "register.subTitle"})}</p>
        {
          Object.entries(registerColumn).map((item, index) => {
            const [ key, info ] = item;

            if (info.status == "close" || info.on_signup == "false")
              return null;

            return (
              <div key={index} className="info_input_box">
                <div className={ info.wrongStatus ? "input_box wrong" : "input_box"}>
                {
                  info.type == "text" || info.type == "password"
                  ? <input
                      value={info.value}
                      type={info.type}
                      placeholder={info.placeholder}
                      onChange={e => registerInfoChange(key, e.target.value)}
                    />
                  : info.type == "calendar"
                    ? null
                    : null
                }
                </div>
                { info.wrongStatus && <p className="wrong_txt">{info.wrongMsg}</p> }
              </div>
            );
          })
        }
        <div className="agree_terms_container">
          <div className="agree_icon_box" onClick={() => setAgreeTerms(!agreeTerms)}>
            {
              agreeTerms && <span className="icon-success icon_agree" />
            }
          </div>
          <div className="agree_txt_box">
            <span className="agree_txt">{props.intl.formatMessage({id: "agree"})}</span>
            <span className="agree_link_txt">{props.intl.formatMessage({id: "terms"})}</span>
          </div>
        </div>
        <button className="register_submit_btn" onClick={() => registerSubmit()}>
          {props.intl.formatMessage({id: "register.submit"})}
        </button>
      </React.Fragment>
    );
  }

  const sendVerifyCode = () => {
    props.setGlobalSpinner(true);

    const apiParams = {
      email: userEmail
    };

    props.sendVerifyCode(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      setGroupIndex(2);
      setReSendCount(60);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    });
  }

	useEffect(() => {
    if (reSendCount < 0)
      return;

    setTimeout(() => setReSendCount(reSendCount - 1), 1000);
  }, [reSendCount]);
  
  const step2Layout = () => {
    return (
      <React.Fragment>
        <p className="process_info_title">{props.intl.formatMessage({id: "verificate.title"})}</p>
        <div className="info_input_box">
          <div className="input_box">
            <input
              value={userEmail}
              type="text"
              placeholder={props.intl.formatMessage({id: "email"})}
              onChange={e => setUserEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="register_submit_btn" onClick={() => sendVerifyCode()}>
          {props.intl.formatMessage({id: "check"})}
        </button>
      </React.Fragment>
    );
  }

  const verifyAccount = () => {
    if (verifyCode == "") {
      return;
    };

    props.setGlobalSpinner(true);

    const apiParams = {
      confirmation_token: verifyCode,
      method: "email"
    };

    props.userConfirmAccount(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      res && props.setGlobalInfoMsg(res.message);

      let tmpLoginData = { ...props.userLoginRlt };

      tmpLoginData.user_confirmed = true;

      props.setUserToken(tmpLoginData);
      props.history.push("/");
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    });
  }
  
  const step3Layout = () => {
    return (
      <React.Fragment>
        <p className="process_info_title">{props.intl.formatMessage({id: "verificate.verifySendTo"})}</p>
        <div className="user_email_box">
          <p className="user_email_txt">{userEmail}</p>
          <button className="modify_email_btn" onClick={() => {
            setReSendCount(-1);
            setGroupIndex(1);
          }}>
            {props.intl.formatMessage({id: "modifyEmail"})}
          </button>
        </div>
        <div className="info_input_box verify_input">
          <div className="input_box">
            <input
              value={verifyCode}
              type="text"
              placeholder={props.intl.formatMessage({id: "verificate.verificateCode"})}
              onChange={e => setVerifyCode(e.target.value)}
            />
          </div>
          <button className="resend_btn" onClick={() => reSendCount <= 0 && sendVerifyCode()}>
          {
            reSendCount >= 0
            ? `${reSendCount}s`
            : props.intl.formatMessage({id: "reSend"})
          }
          </button>
        </div>
        <button className="register_submit_btn" onClick={() => verifyAccount()}>
          {props.intl.formatMessage({id: "verificate.verificate"})}
        </button>
      </React.Fragment>
    );
  }
	
	return (
		<div className="register_page">
      <div className="register_container">
        <div className="process_step_box">
        {
          stepData.map((item, index) => {
            return (
              <div key={index} className="step_group">
                <div className={groupIndex == index ? `step_box active${index+1}` : "step_box" }>
                  <i className="step_num">{index + 1}</i>
                  <div className="hr" />
                  <span className="step_txt">{item}</span>
                </div>
                { groupIndex == index && <div className={`step${index+1}_triangle`} /> }
              </div>
            );
          })
        }
        {
          mobileStepData.map((item, index) => {
            return (
              <div key={index} className="mobile_step_group">
                <div className={groupIndex == index ? `step_box active${index+1}` : "step_box" }>
                  <i className="step_num">{index + 1}</i>
                  <div className="hr" />
                  <span className="step_txt">{item}</span>
                </div>
                { groupIndex == index && <div className={`step${index+1}_triangle`} /> }
              </div>
            );
          })
        }
        </div>
        <div className="process_info_container">
        {
          registerColumn &&
          groupIndex == 0
          ? step1Layout()
          : groupIndex == 1
            ? step2Layout()
            : groupIndex == 2
              ? step3Layout()
              : null
        }
        </div>
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
	getCommunityPreload,
  userSignup,
  sendVerifyCode,
  userConfirmAccount,
  setUserToken,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(Register)));