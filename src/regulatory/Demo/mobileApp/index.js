/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';

/* components */
import SiteConfig from "../config";
import MobileHeaderPTN from "../../../pattern/mobile/header/sunbet";
import MobileHome from "../pages/mobile/home";
import MobileLogin from "../pages/mobile/login";
import MobileForgetPwd from "../pages/mobile/forgetPwd";
import MobileRegister from "../pages/mobile/register";
import MobileNews from "../pages/mobile/news";
import MobileBonuses from "../pages/mobile/bonuses";
import MobileMember from "../pages/mobile/member";
import MobileAbout from "../pages/mobile/about";
import MobilePrivacy from "../pages/mobile/privacy";
import MobileDisclaimer from "../pages/mobile/disclaimer";
import MobileRationalBetting from "../pages/mobile/rationalBetting";
import GlobalMsg from "../../../components/globalMsg/template1";
import GlobalSpinner from "../../../components/globalSpinner/template1";

/* pattern css */
import "./index.scss";
import "./header.scss";
import "./login.scss";
import "./bonuses.scss";

const MobileApp = props => {

  const header = () => {
    return (
      <MobileHeaderPTN
        siteConfig={SiteConfig}
        logoImg={require("../images/logo.png")}
        listImg={require("../images/icon-list.svg")}
        logoClick={() => props.history.push("/mobile")}
        loginRoute="/mobile/login"
				registerRoute="/mobile/register"
				bonusesRoute="/mobile/bonuses"
        language={[
          {
            title: props.intl.formatMessage({id: "language.zh_cn"}),
            langKey: "zh-CN"
          }
        ]}
        otherLink={[
          {
            title: props.intl.formatMessage({id: "aboutUs"}),
            route: "/mobile/aboutUs"
          },
          {
            title: props.intl.formatMessage({id: "privacy"}),
            route: "/mobile/privacy"
          },
          {
            title: props.intl.formatMessage({id: "disclaimer"}),
            route: "/mobile/disclaimer"
          },
          {
            title: props.intl.formatMessage({id: "rationalBetting"}),
            route: "/mobile/rationalBetting"
          }
				]}
				memberNav={[
					{
						key: "info",
						name: props.intl.formatMessage({id: "memberMenu.center"}),
						route: "/mobile/member/info"
					},
					{
						key: "changePassword",
						name: props.intl.formatMessage({id: "memberMenu.changePwd"}),
						route: "/mobile/member/changePassword"
					},
					{
						key: "deposit",
						name: props.intl.formatMessage({id: "wallet.deposit"}),
						route: "/mobile/member/deposit",
						img: require("../images/deposit.png")
					},
					{
						key: "withdraw",
						name: props.intl.formatMessage({id: "wallet.withdraw"}),
						route: "/mobile/member/withdraw"
					},
					{
						key: "mainWalletHistory",
						name: props.intl.formatMessage({id: "memberMenu.mainOrders"}),
						route: "/mobile/member/mainWalletHistory"
					},
					{
						key: "gameHistory",
						name: props.intl.formatMessage({id: "memberMenu.gameOrder"}),
						route: "/mobile/member/gameHistory"
					},
					{
						key: "nofitication",
						name: props.intl.formatMessage({id: "memberMenu.message"}),
						route: "/mobile/member/nofitication"
					},
					{
						key: "gameWallet",
						name: props.intl.formatMessage({id: "wallet.gameWallet"}),
						route: "/mobile/member/gameWallet",
						img: require("../images/game-transfer.png")
					}
				]}
      />
    );
	};
	
	const footer = () => {
		return (
			<div className="mobile_footer">
				<div className="company_logo">
					<img className="logo_img" src={require("../images/logo-black.png")} />
				</div>
				<div className="company_desc">
					<p className="title">{props.intl.formatMessage({id: "footer.companyTitle"})}</p>
					<p className="description">{props.intl.formatMessage({id: "footer.companyDesc"})}</p>
				</div>
			</div>
		);
	}
	
	return (
		<div className="mobile_app">
			<GlobalMsg />
			<GlobalSpinner BGColor="rgba(5,5,5,0.7)" SpinnerColor="#ccc" />
			<Switch>
        <Route exact path="/mobile">
          {header()}
          <MobileHome device="mobile" />
          {footer()}
        </Route>
        <Route exact path="/mobile/login">
          {header()}
          <MobileLogin
						siteConfig={SiteConfig}
						registerRoute="/mobile/register"
        		forgetPwdRoute="/mobile/forgetPwd"
					/>
          {footer()}
        </Route>
        <Route exact path="/mobile/forgetPwd">
          {header()}
          <MobileForgetPwd />
          {footer()}
        </Route>
        <Route exact path="/mobile/register">
          {header()}
          <MobileRegister />
          {footer()}
        </Route>
        <Route exact path="/mobile/news">
          {header()}
          <MobileNews />
          {footer()}
        </Route>
        <Route exact path="/mobile/bonuses">
          {header()}
          <MobileBonuses />
          {footer()}
        </Route>
        <Route exact path="/mobile/member/:kind">
          {header()}
          <MobileMember addBankcardRoute="/mobile/member/addBankcard" />
          {footer()}
        </Route>
        <Route exact path="/mobile/aboutUs">
          {header()}
          <MobileAbout />
          {footer()}
        </Route>
        <Route exact path="/mobile/privacy">
          {header()}
          <MobilePrivacy />
          {footer()}
        </Route>
        <Route exact path="/mobile/disclaimer">
          {header()}
          <MobileDisclaimer />
          {footer()}
        </Route>
        <Route exact path="/mobile/rationalBetting">
          {header()}
          <MobileRationalBetting />
          {footer()}
        </Route>
			</Switch>
		</div>
	);
};

export default withRouter(injectIntl(MobileApp));