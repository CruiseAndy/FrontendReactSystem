/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  setLocales,
  getCommunityPreload,
  userLogin,
  setUserToken,
  userLogout,
  setGlobalSpinner,
  setGlobalInfoMsg,
  setGlobalErrMsg
} from "../../../../actions";

/* components */
import BalanceFormat from "../../../../components/balanceFormat/template_1";

/* socket */
import {
  socketGetMainBalance
} from "../../../../components/socket";

import "./index.scss";

const Header = props => {

  const [ userInfoAccount, setUserInfoAccount ] = useState("");
  const [ allowRegister, setAllowRegister ] = useState(false);
  const [ showLeftSlide, setShowLeftSlide ] = useState(false);
  const [ showRightSlide, setShowRightSlide ] = useState(false);

	useEffect(() => {
    props.getCommunityPreload(props.intl)
    .then(res => {
      setAllowRegister(res.allow_register);
    })
  }, []);

	useEffect(() => {
    showLeftSlide && setShowLeftSlide(false);
    showRightSlide && setShowRightSlide(false);
  }, [props.history.location.pathname]);

	useEffect(() => {

    if (!props.userLoginRlt || !props.siteConfig.login.remember)
      return;

    setUserInfoAccount(props.userLoginRlt.account);
    socketGetMainBalance();
  }, [props.userLoginRlt]);

  const userLogout = () => {
    if (!props.userLoginRlt)
      return;

    props.setGlobalSpinner(true);

    props.userLogout(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      props.setUserToken(null);
      !props.siteConfig.login.rememberAccount && localStorage.removeItem(`${props.siteConfig.company}-account`);
      !props.siteConfig.login.rememberPassword && localStorage.removeItem(`${props.siteConfig.company}-password`);
      localStorage.removeItem(`${props.siteConfig.company}-session`);
      props.history.push("/mobile");
      setShowLeftSlide(false);
      setShowRightSlide(false);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const slideChange = direction => {
    if (direction == "left") {
      setShowRightSlide(false);
      setShowLeftSlide(!showLeftSlide);
    }
    else {
      setShowLeftSlide(false);
      setShowRightSlide(!showRightSlide);
    }
  }

  return (
    <div className={
        showLeftSlide
        ? "mobile_header_pattern show_left_slide"
        : showRightSlide
          ? "mobile_header_pattern show_right_slide"
          : "mobile_header_pattern"
      }>
      <div className="header_container">
        <div className="header_menu_box" onClick={() => slideChange("left")}>
          <img className="list_img" src={props.listImg} />
        </div>
        <div className="header_logo_box">
          <img className="logo_img" src={props.logoImg} onClick={() => props.logoClick()} />
        </div>
        <div className="header_user_box">
        {
          props.userLoginRlt
          ? <div className="login_box" onClick={() => slideChange("right")}>
              <span className="icon-user icon_user" />
            </div>
          : <div className="unlogin_box">
              <span className="register_txt" onClick={() => props.history.push(props.registerRoute)}>
                {props.intl.formatMessage({id: "register.title"})}
              </span>
              {
                allowRegister &&
                <React.Fragment>
                  <div className="hr" />
                  <span className="login_txt" onClick={() => props.history.push(props.loginRoute)}>
                    {props.intl.formatMessage({id: "login"})}
                  </span>
                </React.Fragment>
              }
            </div>
        }
        </div>
      </div>

      {/* side mask */}
      <div className="slide_mask"/>

      {/* left side */}
      <div className="slide_pattern header_menu_container">
        <div className="content_group">
          <div className="link_box" onClick={() => {
              setShowLeftSlide(false);
              setShowRightSlide(false);
              if (props.history.location.pathname != "/mobile") 
                props.history.push("/mobile");
            }}>
            <span className="icon-home icon_link" />
            <span className="link_txt">{props.intl.formatMessage({id: "navBar.home"})}</span>
          </div>
          <div className="link_box" onClick={() => props.history.push(props.bonusesRoute)}>
            <span className="icon-bonus icon_link" />
            <span className="link_txt">{props.intl.formatMessage({id: "bonuses.title"})}</span>
          </div>
        </div>
        <div className="content_group">
          <p className="lang_title">{props.intl.formatMessage({id: "selectLanguage"})}</p>
          {
            props.language.map((item, index) => {
              const { title, langKey } = item;

              return (
                <div key={index} className="link_box" onClick={() => props.setLocales(langKey)}>
                  <div className="lang_chk">
                  {
                    langKey == props.localesRlt && <span className="icon-success icon_chk"/>
                  }
                  </div>
                  <span className="link_txt">{title}</span>
                </div>
              );
            })
          }
        </div>
        <div className="content_group">
        {
          props.otherLink.map((item, index) => {
            const { title, route } = item;

            return (
              <div key={index} className="link_box" onClick={() => props.history.push(route)}>
                <span className={props.history.location.pathname == route ? "link_txt active" : "link_txt"}>
                  {title}
                </span>
              </div>
            );
          })
        }
        </div>
      </div>

      {/* right side */}
      <div className="slide_pattern header_user_info_container">
        <div className="user_info_box table">
          <div className="user_info_group tr">
            <span className="user_info_title_txt td">{props.intl.formatMessage({id: "account"})}</span>
            <span className="user_info_txt td">{userInfoAccount}</span>
          </div>
          <div className="user_info_group tr">
            <span className="user_info_title_txt td">{props.intl.formatMessage({id: "wallet.mainBalance"})}</span>
            <span className="user_info_txt td">
              <BalanceFormat prefix="$" balance={props.userWalletBalance} />
            </span>
          </div>
        </div>
        <div className="member_nav_container">
          <div className="member_nav_img_group">
            {
              props.memberNav.map((item, index) => {
                if (!item.hasOwnProperty("img"))
                  return null;

                const { name, route, img } = item;

                return (
                  <div
                    key={index}
                    className="nav_img_box"
                    onClick={() => props.history.push(route)}
                  >
                    <img src={img} className="nav_img" />
                    <span className="nav_img_txt">{name}</span>
                  </div>
                );
              })
            }
          </div>
          {
            props.memberNav.map((item, index) => {
              const { name, route } = item;

              if (item.hasOwnProperty("img"))
                  return null;

              return (
                <div
                  key={index}
                  className="member_nav_group"
                  onClick={() => props.history.push(route)}
                >
                  <div className="nav_item_box">
                    <span className={props.history.location.pathname == route ? "nav_txt active" : "nav_txt"}>
                      {name}
                    </span>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="logout_btn_box">
          <button className="logout_btn" onClick={() => userLogout()}>
            {props.intl.formatMessage({id: "logout"})}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData, LocalesData, UserWalletData }) => {
  const { userLoginRlt } = UserAuthData;
  const { localesRlt } = LocalesData;
  const { userWalletBalance } = UserWalletData;
	return { userLoginRlt, localesRlt, userWalletBalance };
};

export default connect(mapStateToProps, {
  setLocales,
  getCommunityPreload,
  userLogin,
  setUserToken,
  userLogout,
  setGlobalSpinner,
  setGlobalInfoMsg,
  setGlobalErrMsg
})(withRouter(injectIntl(Header)));