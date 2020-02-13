/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userBankCards,
  userMainWalletWithdrawLimit,
  userWalletWithdraw,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */
import InputRange from "../../../../../components/inputRange/template1";
import BalanceFormat from "../../../../../components/balanceFormat/template_1";

import "./index.scss";

const MemberWithdraw = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const [ canAddBankcard, setCanAddBankcard ] = useState(false);
  const [ bankcardAmount, setBankcardAmount ] = useState(0);
  const [ bankcardList, setBankcardList ] = useState(null);
  const [ bankcardPoint, setBankcardPoint ] = useState(0);
  const [ withdrawLimit, setWithdrawLimit ] = useState(null);
  const [ withdrawAmount, setWithdrawAmount ] = useState(0);
  
	useEffect(() => {
    if (!props.userLoginRlt)
      return;
    
    props.userMainWalletWithdrawLimit(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      setWithdrawLimit(res);
      setWithdrawAmount(res.min);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    });

    props.userBankCards(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      setCanAddBankcard(res.can_add_new_card);
      setBankcardList(res.bank_cards);
      setBankcardAmount(res.bank_cards.length);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    });
  }, [props.userLoginRlt]);

  const accountEncode = acc => "******" + acc.substr(acc.length - 4, acc.length);

  const withdrawSubmit = () => {

    const apiParams = {
      amount: withdrawAmount,
      user_card_id: bankcardList[bankcardPoint].id
    }

    props.userWalletWithdraw(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalInfoMsg(res.message);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    });
  }

	return (
		<div className="member_withdraw_page">
      <div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "wallet.withdraw"})}</span>
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
      <div className="withdraw_container">
        <div className="bankcard_box">
          <span className="bankcard_amount">
            {`${props.intl.formatMessage({id: "bankCard.bankcardAmount"})}: ${bankcardAmount}/10`}
          </span>
          {
            canAddBankcard &&
            <button className="add_bankcard" onClick={() => props.history.push(props.addBankcardRoute)}>
              {`${props.intl.formatMessage({id: "bankCard.newBankcard"})} +`}
            </button>
          }
        </div>
        <div className="withdraw_box">
          <div className="bankcard_list">
            <select className="mobile_bankcard_select" onChange={e => setBankcardPoint(e.target.value)} value={bankcardPoint}>
            {
              bankcardList && bankcardList.length != 0 &&
              bankcardList.map((item, index) => {
                const { bank_name, province, bank_account } = item;

                return (
                  <option key={index} value={index}>
                    {`${bank_name} / ${province} / ${accountEncode(bank_account)}`}
                  </option>
                );
              })
            }
            </select>
            {
              bankcardList && bankcardList.length != 0 &&
              bankcardList.map((item, index) => {
                const { bank_name, province, bank_account } = item;

                return (
                  <div key={index} className="bankcard_group" onClick={() => setBankcardPoint(index)}>
                    <div className={bankcardPoint == index ? "bankcard_summary_info_box active" : "bankcard_summary_info_box"}>
                      <div className={bankcardPoint == index ? "bankcard_num active" : "bankcard_num"}>{index + 1}</div>
                      <div className="hr" />
                      <span className={bankcardPoint == index ? "bankcard_summary_info active" : "bankcard_summary_info"}>
                        {`${bank_name} / ${province} / ${accountEncode(bank_account)}`}
                      </span>
                    </div>
                    {
                      bankcardPoint == index &&
                      <span className="bankcard_point_triangle" />
                    }
                  </div>
                );
              })
            }
          </div>
          {
            withdrawLimit && bankcardList && bankcardList.length != 0 &&
            <div className="withdraw_content">
              <div className="bankcard_label">{bankcardPoint + 1}</div>
              <div className="bankcard_detail_info_box">
                <span className="detail_info_title"></span>
                <span className="detail_info">{accountEncode(bankcardList[bankcardPoint].bank_account)}</span>
              </div>
              <div className="bankcard_detail_info_box">
                <span className="detail_info_title">{props.intl.formatMessage({id: "bankCard.accountName"})}</span>
                <span className="detail_info">{bankcardList[bankcardPoint].user_name}</span>
              </div>
              <div className="bankcard_detail_info_box">
                <span className="detail_info_title">{props.intl.formatMessage({id: "bankCard.branch"})}</span>
                <span className="detail_info">{bankcardList[bankcardPoint].sub_branch}</span>
              </div>
              <div className="bankcard_detail_info_box">
                <span className="detail_info_title">{props.intl.formatMessage({id: "bankCard.province"})}</span>
                <span className="detail_info">{bankcardList[bankcardPoint].province}</span>
              </div>
              <div className="bankcard_detail_info_box">
                <span className="detail_info_title">{props.intl.formatMessage({id: "bankCard.area"})}</span>
                <span className="detail_info">{bankcardList[bankcardPoint].area}</span>
              </div>
              <div className="dialog_deal_adjust_box">
                <InputRange
                  value={withdrawAmount}
                  min={parseInt(withdrawLimit.min)}
                  max={parseInt(withdrawLimit.max)}
                  step={1}
                  onChange={val => setWithdrawAmount(val)}
                />
              </div>
              <button className="next_step_btn" onClick={() => withdrawSubmit()}>
                {props.intl.formatMessage({id: "next"})}
              </button>
            </div>
          }
        </div>
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
  userBankCards,
  userMainWalletWithdrawLimit,
  userWalletWithdraw,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberWithdraw)));