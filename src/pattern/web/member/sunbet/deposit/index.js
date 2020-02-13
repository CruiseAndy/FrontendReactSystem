/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityPayments,
  userWalletDeposit,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */
import DealDialog from "./dealDialog";
import BalanceFormat from "../../../../../components/balanceFormat/template_1";

import "./index.scss";

const MemberDeposit = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const [ paymentInfo, setPaymentInfo ] = useState(null);
  const [ showDepositDialog, setShowDepositDialog ] = useState(false);
  const [ depositInfo, setDepositInfo ] = useState(null);
  
	useEffect(() => {
    props.getCommunityPayments(props.intl)
    .then(res => {
      setPaymentInfo(res);
    });
  }, []);
  
	const statusActiveLayout = () => {
    return (
      <div className="status_active">
        <span className="icon-page-next active_icon" />
      </div>
    );
  };
  
	const statusMaintainLayout = () => {
    return (
      <div className="status_maintain">
        <span className="maintain_txt">
          {props.intl.formatMessage({id: "maintain"})}
        </span>
      </div>
    );
  };

  const depositSubmit = (method, amount) => {
    let apiParams = {};

    apiParams = {
      amount,
      method,
      device: isMobile ? "mobile" : "desktop"
    };

    setShowDepositDialog(false);

    props.setGlobalSpinner(true);

    props.userWalletDeposit(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      setShowDepositDialog(false);
      window.open(res.pay_url);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    });
  }

	return (
		<div className="member_deposit_page">
      {
        showDepositDialog &&
        <DealDialog
          depositInfo={depositInfo}
          closeDialog={() => setShowDepositDialog(false)}
          onSubmit={depositSubmit}
        /> 
      }
      <div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "wallet.deposit"})}</span>
      </div>
      {
        isMobile &&
        <div className="main_balance_box">
          <span className="main_balance_title_txt">{props.intl.formatMessage({id: "wallet.mainBalance"})}</span>
          <span className="main_balance_txt">
            <BalanceFormat prefix="$" balance={props.userWalletBalance} />
          </span>
        </div>
      }
      <div className="payment_container">
      {
        paymentInfo &&
        paymentInfo.map((item, index) => {
          const { name, status, image_url } = item;

          return (
            <div key={index} className="payment_box" onClick={() => {
                if (status != "active")
                  return;
                  
                setDepositInfo(item);
                setShowDepositDialog(true);
              }}>
              <div className="payment_img_box">
                {
                  image_url == ""
                  ? <img src={require("./default.png")} className="payment_img" />
                  : <img src={image_url} className="payment_img" />
                }
              </div>
              <span className="payment_name">{name}</span>
              <div className="payment_status_box">
              {
                status == "active"
                ? statusActiveLayout()
                : status == "maintain"
                  ? statusMaintainLayout()
                  : null
              }
              </div>
            </div>
          );
        })
      }
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
  getCommunityPayments,
  userWalletDeposit,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberDeposit)));