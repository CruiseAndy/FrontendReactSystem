/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';

/* components */
import SiteConfig from "../config";
import APIPage from "../testAPI";
import HeaderPTN from "../../../pattern/web/header/demo";
import FooterPTN from "../../../pattern/web/footer/sunbet";
import Home from "../pages/web/home";
import About from "../pages/web/about";
import Privacy from "../pages/web/privacy";
import Disclaimer from "../pages/web/disclaimer";
import RationalBetting from "../pages/web/rationalBetting";
import News from "../pages/web/news";
import Bonuses from "../pages/web/bonuses";
import Member from "../pages/web/member";
import Register from "../pages/web/register";
import ForgetPwd from "../pages/web/forgetPwd";
import GlobalMsg from "../../../components/globalMsg/template1";
import GlobalSpinner from "../../../components/globalSpinner/template1";

/* pattern css */
import "./index.scss";
import "./header.scss";
import "./footer.scss";
import "./register.scss";
import "./forgetPwd.scss";
import "./news.scss";
import "./bonuses.scss";
import "./member.scss";
import "./globalMsg.scss";

const WebApp = props => {

  const header = () => {
    return (
      <HeaderPTN
        siteConfig={SiteConfig}
        logoImg={require("../images/logo.png")}
        logoClick={() => {}}
        registerRoute="/register"
        forgetPwdRoute="/forgetPwd"
        goHomeAfterLogin={[ "register", "forgetPwd" ]}
        navList={[
          {
            key: "home",
            name: props.intl.formatMessage({id: "navBar.home"}),
            route: "/",
            icon: "icon-home",
            requireLogin: false
          },
          {
            key: "bonuses",
            name: props.intl.formatMessage({id: "bonuses.title"}),
            route: "/bonuses",
            icon: "icon-bonus",
            requireLogin: false
          },
          {
            key: "member",
            name: props.intl.formatMessage({id: "memberCentral"}),
            route: "/member/info",
            icon: "",
            requireLogin: true
          }
        ]}
      />
    );
  }

  const footer = () => {
    return (
      <FooterPTN
        siteConfig={SiteConfig}
        logoImg={require("../images/logo-black.png")}
        bannerImg={require("../images/footer-banner.png")}
        flashImg={require("../images/flash.png")}
        companyTitle={props.intl.formatMessage({id: "footer.companyTitle"})}
        companyDesc={props.intl.formatMessage({id: "footer.companyDesc"})}
        moreLink={[
          {
            title: props.intl.formatMessage({id: "aboutUs"}),
            route: "/aboutUs"
          },
          {
            title: props.intl.formatMessage({id: "privacy"}),
            route: "/privacy"
          },
          {
            title: props.intl.formatMessage({id: "disclaimer"}),
            route: "/disclaimer"
          },
          {
            title: props.intl.formatMessage({id: "rationalBetting"}),
            route: "/rationalBetting"
          }
        ]}
        language={[
          {
            title: props.intl.formatMessage({id: "language.zh_cn"}),
            langKey: "zh-CN"
          }
        ]}
        footer={[
          {
            title: props.intl.formatMessage({id: "aboutUs"}),
            route: "/aboutUs"
          },
          {
            title: props.intl.formatMessage({id: "privacy"}),
            route: "/privacy"
          },
          {
            title: props.intl.formatMessage({id: "disclaimer"}),
            route: "/disclaimer"
          },
          {
            title: props.intl.formatMessage({id: "rationalBetting"}),
            route: "/rationalBetting"
          }
        ]}
      />
    );
  }
	
	return (
		<div className="wep_app">
      <GlobalMsg />
      <GlobalSpinner BGColor="rgba(5,5,5,0.7)" SpinnerColor="#ccc" />
			<Switch>
        <Route exact path="/">
          {header()}
          <Home device="desktop" />
          {footer()}
        </Route>
        <Route exact path="/register" siteConfig={SiteConfig}>
          {header()}
          <Register />
          {footer()}
        </Route>
        <Route exact path="/forgetPwd">
          {header()}
          <ForgetPwd />
          {footer()}
        </Route>
        <Route exact path="/news">
          {header()}
          <News />
          {footer()}
        </Route>
        <Route exact path="/bonuses">
          {header()}
          <Bonuses />
          {footer()}
        </Route>
        <Route path="/member/:kind">
          {header()}
          <Member addBankcardRoute="/member/addBankcard" />
          {footer()}
        </Route>
        <Route exact path="/aboutUs">
          {header()}
          <About />
          {footer()}
        </Route>
        <Route exact path="/privacy">
          {header()}
          <Privacy />
          {footer()}
        </Route>
        <Route exact path="/disclaimer">
          {header()}
          <Disclaimer />
          {footer()}
        </Route>
        <Route exact path="/rationalBetting">
          {header()}
          <RationalBetting />
          {footer()}
        </Route>
				<Route exact path="/DontAskAnything" component={APIPage} />
			</Switch>
		</div>
	);
};

export default withRouter(injectIntl(WebApp));