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
} from "../../../../actions";

/* components */
import BalanceFormat from "../../../../components/balanceFormat/template_1";
import InfoPage from "./info";
import ChangePwdPage from "./changePwd";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import AddBankcard from "./addBankcard";
import MainWalletHistory from "./mainWalletHistory";
import GameHistory from "./gameHistory";
import Notification from "./notification";
import GameWallet from "./gameWallet";

/* socket */
import {
  socketGetMainBalance
} from "../../../../components/socket";

import "./index.scss";

const MemberPTN = props => {

  const pageComponent = {
    info: <InfoPage />,
    changePassword: <ChangePwdPage />,
    deposit: <Deposit />,
    withdraw: <Withdraw addBankcardRoute={props.addBankcardRoute} />,
    addBankcard: <AddBankcard />,
    mainWalletHistory: <MainWalletHistory />,
    gameHistory: <GameHistory searchImg={props.searchImg} />,
    nofitication: <Notification searchImg={props.searchImg} />,
    gameWallet: <GameWallet loadingColor={props.loadingColor} />
  }

  const [ userAccount, setUserAccount ] = useState("");
  const [ nowRoutePath, setNowRoutePath ] = useState("");
  const [ nowRouteKey, setNowRouteKey ] = useState(props.menuList[0].key);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
    const keyIndex = props.history.location.pathname.split("/").length - 1;
    setNowRoutePath(props.history.location.pathname);
    setNowRouteKey(props.history.location.pathname.split("/")[keyIndex]);
	}, [props.history.location]);

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    setUserAccount(props.userLoginRlt.account);
    socketGetMainBalance();

	}, [props.userLoginRlt]);
	
	return (
		<div className="member_pattern">
      <div className="member_menu_box">
        <div className="member_info_box table">
          <div className="member_info_group tr">
            <span className="info_title td">{props.intl.formatMessage({id: "account"})}</span>
            <span className="info_data td">{userAccount}</span>
          </div>
          <div className="member_info_group tr">
            <span className="info_title td">{props.intl.formatMessage({id: "wallet.mainBalance"})}</span>
            <span className="info_data balance td">
              <BalanceFormat prefix="$" balance={props.userWalletBalance} />
            </span>
          </div>
        </div>
        <div className="menu_list_box">
        {
          props.menuList.map((item, index) => {
            const { name, route, key } = item;

            return (
              <div key={index} className="menu_group" onClick={() => {
                  props.history.push(route);
                  setNowRouteKey(key);
                }}>
                <div className={route == nowRoutePath ? "route_point active" : "route_point"} />
                <span className="menu_name">{name}</span>
                {
                  route == nowRoutePath
                  ? <div className="active_icon_box">
                      <span className="icon-page-next icon_next" />
                    </div>
                  : null
                }
              </div>
            );
          })
        }
        </div>
      </div>
      <div className="member_content">
        { pageComponent[nowRouteKey] }
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData, UserWalletData }) => {
  const { userLoginRlt } = UserAuthData;
  const { userWalletBalance } = UserWalletData;
	return { userLoginRlt, userWalletBalance };
};

export default connect(mapStateToProps, {
	getCommunityGames,
	getGameLogInUrl,
	setGlobalErrMsg
})(withRouter(injectIntl(MemberPTN)));