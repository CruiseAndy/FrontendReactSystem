/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  userResetPwdVerifyCode,
  userResetPassword,
  setUserToken,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

import "./index.scss";

const ForgetPwd = props => {

  const [ userContact, setUserContact ] = useState("");
  const [ sendStatus, setSendStatus ] = useState(false);
  const [ resetVerifyCode, setResetVerifyCode ] = useState("");
  const [ newPwd, setNewPwd ] = useState("");
  const [ confirmNewPwd, setConfirmNewPwd ] = useState("");

	useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);

  const getVerifyCodeLayout = () => {
    return (
      <React.Fragment>
        <div className="forgetPwd_info_box">
          <div className="forgetPwd_email_box">
            <span className="forgetPwd_email_title_txt">{props.intl.formatMessage({id: "inputEmail"})}</span>
            <input type="text" className="email_info_input" value={userContact} onChange={e => setUserContact(e.target.value)} />
          </div>
        </div>
          <button className="forget_submit" onClick={() => getVerifyCode()}>
            {props.intl.formatMessage({id: "checkSend"})}
          </button>
      </React.Fragment>
    );
  };

  const getVerifyCode = () => {
    if (userContact == "")
      return;

    props.setGlobalSpinner(true);

    props.userResetPwdVerifyCode(props.intl, userContact)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      setSendStatus(true);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    });
  };

  const resetPwdLayout = () => {
    return (
      <React.Fragment>
        <div className="forgetPwd_info_box">
          <div className="forgetPwd_email_box">
            <span className="forgetPwd_email_title_txt">{props.intl.formatMessage({id: "inputVerifyCode"})}</span>
            <input type="text" className="email_info_input" value={resetVerifyCode} onChange={e => setResetVerifyCode(e.target.value)} />
          </div>
        </div>
        <div className="forgetPwd_info_box">
          <div className="forgetPwd_email_box">
            <span className="forgetPwd_email_title_txt">{props.intl.formatMessage({id: "inputNewPwd"})}</span>
            <input type="password" className="email_info_input" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
          </div>
        </div>
        <div className="forgetPwd_info_box">
          <div className="forgetPwd_email_box">
            <span className="forgetPwd_email_title_txt">{props.intl.formatMessage({id: "inputNewPwdAgain"})}</span>
            <input type="password" className="email_info_input" value={confirmNewPwd} onChange={e => setConfirmNewPwd(e.target.value)} />
          </div>
        </div>
          <button className="forget_submit" onClick={() => resetPassword()}>
            {props.intl.formatMessage({id: "checkSend"})}
          </button>
      </React.Fragment>
    );
  };

  const resetPassword = () => {
    if (resetVerifyCode == "" || newPwd == "" || newPwd != confirmNewPwd)
      return;

    props.setGlobalSpinner(true);

    const apiParams = {
      reset_password_token: resetVerifyCode,
      new_password: newPwd,
      password_confirmation: confirmNewPwd
    }

    props.userResetPassword(props.intl, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(props.intl.formatMessage({id: "resetPwdSuccess"}));
      props.history.push("/");
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }
	
	return (
		<div className="forgetPwd_page">
      <div className="forgetPwd_container">
        <div className="forgetPwd_box">
          <p className="forgetPwd_title_txt">{`${props.intl.formatMessage({id: "forgetPwd"})}？`}</p>
          {
            sendStatus ? resetPwdLayout() : getVerifyCodeLayout()
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
  userResetPwdVerifyCode,
  userResetPassword,
  setUserToken,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(ForgetPwd)));