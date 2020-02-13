/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import Favicon from 'react-favicon';
import windowSize from 'react-window-size';

/* language */
import ri_zh from "react-intl/locale-data/zh";
import ri_en from "react-intl/locale-data/en";
import CommonCN from "../../i18n/zh_CN";
import CommonEN from "../../i18n/en"
import cn from "./i18n/zh_CN";
import en from "./i18n/en";
import apiMsgCN from "../../i18n/apiMsgCN";
import apiMsgEN from "../../i18n/apiMsgEN";

/* components */
import WebApp from "./webApp/index";
import MobileApp from "./mobileApp/index";
import SiteConfig from "./config";
import TokenHandler from "../../components/tokenHandler";
import Socket from "../../components/socket";

/* actions */
import { setLocales } from "../../actions";

/* base styleSheet */
// import "./fonts/iconStyle.scss";
import "./fonts/style.scss";
import "./fonts/variables.scss";
import "./fonts/icomoon/icomoon.eot";

addLocaleData([ ...ri_zh, ...ri_en ]);

const langCN = { ...CommonCN, ...apiMsgCN, ...cn };
const langEN = { ...CommonEN, ...apiMsgEN, ...en };

const Main = props => {
	const [ localeMessages, setLocaleMessages ] = useState(langCN);
	const [ isMobile, setIsMobile ] = useState(false);

	// initial language
	useEffect(() => {
		const hasLocale = localStorage.hasOwnProperty(`${SiteConfig.company}-locale`);

		if (hasLocale) {
			props.setLocales(localStorage.getItem(`${SiteConfig.company}-locale`));
		}
		else {
			localStorage.setItem(`${SiteConfig.company}-locale`, SiteConfig.defaultLocale);
			props.setLocales(SiteConfig.defaultLocale);
		}
	}, []);

	// layout display controller
	useEffect(() => {
		if (props.windowWidth <= SiteConfig.RWDSill)
			setIsMobile(true);
		else
			setIsMobile(false);
	}, [props.windowWidth]);

	// address redirect
	useEffect(() => {
		const { location, history } = props;

		if (isMobile) {
			if (location.pathname.length === 1) {
				history.push(`/mobile`);
			} else {
				history.push(`/mobile${location.pathname}`);
			}
		} else {
			history.push(location.pathname.split("mobile")[1]);
		}
	}, [isMobile]);

	// multi-language controller
	useEffect(() => {
		switch(props.localesRlt) {
			case "zh-CN":
				setLocaleMessages(langCN)
				localStorage.setItem(`${SiteConfig.company}-locale`, "zh-CN");
				break;
			case "en":
				setLocaleMessages(langEN);
				localStorage.setItem(`${SiteConfig.company}-locale`, "en");
				break;
			default:
				setLocaleMessages(langCN);
				localStorage.setItem(`${SiteConfig.company}-locale`, "zh-CN");
				break;
		}
	}, [props.localesRlt]);

	const tokenHandler = () => {
		return (
			<TokenHandler
				siteConfig={SiteConfig}
				needLoginPage={[ "member" ]}
			/>
		);
	}

	const socket = () => {
		return (
			<Socket
				siteConfig={SiteConfig}
			/>
		);
	}
	
	return (
		<IntlProvider locale={props.localesRlt} key={props.localesRlt} defaultLocale="en" messages={localeMessages}>
			<React.Fragment>
				{tokenHandler()}
				{socket()}
				<img src={require("./images/favicon.png")} style={{ width: "0px", height: "0px", position: "absolute" }} />
				<Favicon url="./images/favicon.png" />
				{
					isMobile
					?	<Switch>
							<MobileApp />
						</Switch>
					:	<Switch>
							<WebApp />
						</Switch>
				}
			</React.Fragment>
		</IntlProvider>
	);
};

const mapStateToProps = ({ LocalesData }) => {
	const { localesRlt } = LocalesData;
	return { localesRlt };
};

export default connect(mapStateToProps, {
	setLocales
})(windowSize(withRouter(Main)));