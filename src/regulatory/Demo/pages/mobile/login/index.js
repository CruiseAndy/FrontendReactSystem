/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  userLogin,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */

import "./index.scss";

const MobileLogin = props => {

  const [ userAccount, setUserAccount ] = useState("");
  const [ userPassword, setPserPassword ] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {

    if (!props.userLoginRlt || !props.siteConfig.login.remember)
      return;

    userAccPwdCtrl();
  }, [props.userLoginRlt]);
  
  const userAccPwdCtrl = () => {
    const hasUserAccount = localStorage.hasOwnProperty(`${props.siteConfig.company}-account`);
    if (hasUserAccount && props.siteConfig.login.rememberAccount) {
      setUserAccount(localStorage.getItem(`${props.siteConfig.company}-account`));
    }

    const hasUserPassword = localStorage.hasOwnProperty(`${props.siteConfig.company}-password`);
    if (hasUserPassword && props.siteConfig.login.rememberPassword) {
      setUserPassword(localStorage.getItem(`${props.siteConfig.company}-password`));
    }
  }

  const userLogin = () => {

    if (userAccount == "") {
      props.setGlobalErrMsg(props.intl.formatMessage({id: "formatErr.account"}));
      return;
    }

    if (userPassword == "") {
      props.setGlobalErrMsg(props.intl.formatMessage({id: "formatErr.password"}));
      return;
    }

    props.setGlobalSpinner(true);

    props.userLogin(props.intl, userAccount, userPassword)
    .then(res => {
      props.setGlobalSpinner(false);

      props.setGlobalInfoMsg(res.message);

      if (props.siteConfig.login.remember) {
        props.siteConfig.login.rememberAccount && localStorage.setItem(`${props.siteConfig.company}-account`, userAccount);
        props.siteConfig.login.rememberPassword && localStorage.setItem(`${props.siteConfig.company}-password`, userPassword);
        props.siteConfig.login.rememberToken && localStorage.setItem(`${props.siteConfig.company}-session`, JSON.stringify(res));
      }

      if (!res.user_confirmed) {
        props.history.push(props.registerRoute);
        return;
      }

      props.history.push("/mobile");
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }
	
	return (
		<div className="mobile_login_page">
      <div className="mobile_login_container">
        <p className="login_title_txt">{props.intl.formatMessage({id: "login"})}</p>
        <div className="user_info_group">
          <input
            type="text"
            className="user_info_input"
            placeholder={props.intl.formatMessage({id: "account"})}
            value={userAccount}
            onChange={e => setUserAccount(e.target.value)}
          />
        </div>
        <div className="user_info_group">
          <input
            type="password"
            className="user_info_input"
            placeholder={props.intl.formatMessage({id: "password"})}
            value={userPassword}
            onChange={e => setPserPassword(e.target.value)}
          />
          <button className="forget_pwd_btn" onClick={() => props.history.push(props.forgetPwdRoute)}>
            {props.intl.formatMessage({id: "forget"})}
          </button>
        </div>
        <button className="login_submit_btn" onClick={() => userLogin()}>
          {props.intl.formatMessage({id: "login"})}
        </button>
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userLogin,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MobileLogin)));