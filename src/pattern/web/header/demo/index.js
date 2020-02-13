/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  getCommunityPreload,
  userLogin,
  setUserToken,
  userLogout,
  saveMainWalletBalance,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../actions";

import "./index.scss";

const Header = props => {

  const navPoint = props.location.pathname;

  const [ userAccount, setUserAccount ] = useState("");
  const [ userPassword, setUserPassword ] = useState("");
  const [ userInfoAccount, setUserInfoAccount ] = useState("");
  const [ isLogin, setIsLogin ] = useState(false);
  const [ memberLink, setMemberLink ] = useState("");
  const [ allowRegister, setAllowRegister ] = useState(false);

	useEffect(() => {
    props.navList.map(item => {
      item.key == "member" && setMemberLink(item.route);
    });

    props.getCommunityPreload(props.intl)
    .then(res => {
      setAllowRegister(res.allow_register);
    })
  }, []);

	useEffect(() => {

    if (!props.userLoginRlt || !props.siteConfig.login.remember)
      return;

    setIsLogin(true);
    setUserInfoAccount(props.userLoginRlt.account);

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
      setIsLogin(true);

      if (props.siteConfig.login.remember) {
        props.siteConfig.login.rememberAccount && localStorage.setItem(`${props.siteConfig.company}-account`, userAccount);
        props.siteConfig.login.rememberPassword && localStorage.setItem(`${props.siteConfig.company}-password`, userPassword);
        props.siteConfig.login.rememberToken && localStorage.setItem(`${props.siteConfig.company}-session`, JSON.stringify(res));
      }

      if (!res.user_confirmed) {
        props.history.push(props.registerRoute);
        return;
      }

      const nowPage = props.history.location.pathname.split("/")[1];

      if (props.goHomeAfterLogin.includes(nowPage))
        props.history.push("/");
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const userLogout = () => {
    if (!props.userLoginRlt)
      return;

    props.setGlobalSpinner(true);

    props.userLogout(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      setIsLogin(false);
      props.setUserToken(null);
      !props.siteConfig.login.rememberAccount && setUserAccount("") && localStorage.removeItem(`${props.siteConfig.company}-account`);
      !props.siteConfig.login.rememberPassword && setUserPassword("") && localStorage.removeItem(`${props.siteConfig.company}-password`);
      localStorage.removeItem(`${props.siteConfig.company}-session`);
      props.saveMainWalletBalance(0);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const unLoginLayout = () => {
    return (
      <React.Fragment>
        <div className="account_box">
          <input
            type="text"
            placeholder={props.intl.formatMessage({id: "account"})}
            value={userAccount}
            onChange={e => setUserAccount(e.target.value)}
          />
        </div>
        <div className="password_box">
          <input
            type="password"
            placeholder={props.intl.formatMessage({id: "password"})}
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
          <div className="forgetPwd_box">
            <button onClick={() => props.history.push(props.forgetPwdRoute)}>
              {props.intl.formatMessage({id: "forget"})}
            </button>
          </div>
        </div>
        <div className="login_box">
          <button onClick={() => userLogin()}>{props.intl.formatMessage({id: "login"})}</button>
        </div>
        {
          allowRegister &&
          <div className="register_box">
            <button onClick={() => props.history.push(props.registerRoute)}>
              {props.intl.formatMessage({id: "register.title"})}
            </button>
          </div>
        }
      </React.Fragment>
    );
  }

  const LoginLayout = () => {
    return (
      <React.Fragment>
        <div className="login_info_box">
          <span className="icon-user login_info_icon" />
        </div>
        <div className="login_info_box">
          <span className="login_info_account">{userInfoAccount}</span>
        </div>
        <div className="login_info_box">
          <button className="member_central" onClick={() => {
              props.userLoginRlt.user_confirmed ? props.history.push(memberLink) : props.history.push(props.registerRoute)}
            }>
            {props.intl.formatMessage({id: "memberCentral"})}
          </button>
        </div>
        <div className="login_info_box">
          <button className="user_logout" onClick={() => userLogout()}>
            {props.intl.formatMessage({id: "logout"})}
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="header_pattern">
      <div className="header_container">
        <div className="logo_section">
          <img className="logo_img" src={props.logoImg} onClick={() => props.logoClick()} />
        </div>
        <div className="login_nav_section">
          <div className="login_section">
          {
            isLogin ? LoginLayout() : unLoginLayout()
          }
          </div>
          <div className="nav_section">
          {
            props.navList.map((item, index) => {
              const { name, route, icon, requireLogin, key } = item;

              if (requireLogin && !(isLogin && props.userLoginRlt && props.userLoginRlt.user_confirmed))
                return;

              const isShowTriangle = navPoint.includes(key) || (navPoint == "/" && key == "home");

              return (
                <div key={index} className="nav_item" onClick={() => {
                    if (props.userLoginRlt && !props.userLoginRlt.user_confirmed)
                      props.history.push(props.registerRoute);
                    else
                      props.history.push(route);
                  }}>
                  <div className="nav_title">
                    <span className={`nav_icon ${icon}`} />
                    <span className="nav_title">{name}</span>
                  </div>
                  <div className={isShowTriangle ? "triangle" : "non_triangle"} />
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  getCommunityPreload,
  userLogin,
  setUserToken,
  userLogout,
  saveMainWalletBalance,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(Header)));