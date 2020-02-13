/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
	getCommunityGames,
	getGameLogInUrl,
	setGlobalErrMsg
} from "../../../../../actions";

/* components */
import SiteConfig from "../../../config";
import MemberPTN from "../../../../../pattern/web/member/sunbet";

import "./index.scss";

const Member = props => {

	const menuList = [
		{
			key: "info",
			name: props.intl.formatMessage({id: "memberMenu.center"}),
			route: "/member/info"
		},
		{
			key: "changePassword",
			name: props.intl.formatMessage({id: "memberMenu.changePwd"}),
			route: "/member/changePassword"
		},
		{
			key: "deposit",
			name: props.intl.formatMessage({id: "wallet.deposit"}),
			route: "/member/deposit"
		},
		{
			key: "withdraw",
			name: props.intl.formatMessage({id: "wallet.withdraw"}),
			route: "/member/withdraw"
		},
		{
			key: "mainWalletHistory",
			name: props.intl.formatMessage({id: "memberMenu.mainOrders"}),
			route: "/member/mainWalletHistory"
		},
		{
			key: "gameHistory",
			name: props.intl.formatMessage({id: "memberMenu.gameOrder"}),
			route: "/member/gameHistory"
		},
		{
			key: "nofitication",
			name: props.intl.formatMessage({id: "memberMenu.message"}),
			route: "/member/nofitication"
		},
		{
			key: "gameWallet",
			name: props.intl.formatMessage({id: "wallet.gameWallet"}),
			route: "/member/gameWallet"
		}
	];
	
	return (
		<div className="member_page">
			<div className="member_container">
				<MemberPTN
					menuList={menuList}
					addBankcardRoute={props.addBankcardRoute}
					searchImg={require("../../../images/search-plus.svg")}
					loadingColor="#ccc"
				/>
			</div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
	getCommunityGames,
	getGameLogInUrl,
	setGlobalErrMsg
})(withRouter(injectIntl(Member)));