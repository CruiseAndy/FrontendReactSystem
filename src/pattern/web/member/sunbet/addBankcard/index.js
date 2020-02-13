/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userBankCards,
  getCommunityBankList,
  addUserBankCard,
  userProfile,
  userBankCardVerifyCode,
  userBankCardVerify,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

import { BankArea } from "../../../../../area";

import "./index.scss";

const MemberInfo = props => {

  const [ accountName, setAccountName ] = useState("");
  const [ accountNum, setAccountNum ] = useState("");
  const [ bankList, setBankList ] = useState(null);
  const [ bankCode, setBankCode ] = useState("");
  const [ bankBranch, setBankBranch ] = useState("");
  const [ bankProvince, setBankProvince ] = useState("");
  const [ bankArea, setBankArea ] = useState("");
  const [ showVerifyStep, setShowVerifyStep ] = useState(false);
  const [ userEmail, setUserEmail ] = useState("");
  const [ bankcardId, setBankcardId ] = useState("");
  const [ verifyCode, setVerifyCode ] = useState("");
  const [ reSendCount, setReSendCount ] = useState(-1);

	useEffect(() => {
    setBankProvince(BankArea[0].cn);
    setBankArea(BankArea[0].citys[0].cn);
  }, []);

	useEffect(() => {

    if (!props.userLoginRlt)
      return;
    
    props.userBankCards(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      if (res.bank_cards.length != 0) {
        setAccountName(res.bank_cards[0].user_name);
      }
    });

    props.getCommunityBankList(props.intl)
    .then(res => {
      setBankList(res);
      setBankCode(res[0].code);
    });

    props.userProfile(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      setUserEmail(res.profile.email.val);
    })

  }, [props.userLoginRlt]);

	useEffect(() => {
    if (reSendCount < 0)
      return;

    setTimeout(() => setReSendCount(reSendCount - 1), 1000);
  }, [reSendCount]);

  const addBankCard = () => {
    props.setGlobalSpinner(true);

    const apiParams = {
      user_name: accountName,
      bank_account: accountNum,
      bank_code: bankCode,
      sub_branch: bankBranch,
      province: bankProvince,
      area: bankArea
    };

    props.addUserBankCard(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      setBankcardId(res.bank_card_id);

      if (res.need_confirm) {
        setShowVerifyStep(true);
        setReSendCount(60);
      }
      else {
        props.history.goBack();
      }
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const sendVerifyCode = cardId => {
    props.userBankCardVerifyCode(props.intl, props.userLoginRlt.auth_token, cardId)
    .then(res => {
      props.setGlobalInfoMsg(res.message);
      reSendCount < 0 && setReSendCount(60);
    })
  }

  const verifySubmit = () => {
    if (verifyCode == "")
      return;
    
    props.setGlobalSpinner(true);

    const apiParams = {
      confirm_token: verifyCode,
      card_id: bankcardId
    }

    props.userBankCardVerify(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      props.history.goBack();
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const addBankCardLayout = () => {
    return (
      <React.Fragment>
        <div className="info_title_box">
          <span className="info_title">{props.intl.formatMessage({id: "bankCard.newBankcard"})}</span>
        </div>
        <div className="info_container">
          {/* 用戶名稱 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.accountName"})}</span>
            </div>
            <div className="info_input_box">
              <input
                type="text"
                className="info_input"
                value={accountName}
                disabled={props.userBankCardsRlt && props.userBankCardsRlt.bank_cards.length != 0 && props.userBankCardsRlt.bank_cards[0].user_name != ""}
                onChange={e => setAccountName(e.target.value)}
              />
            </div>
          </div>
          {/* 帳戶號碼 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.accountNum"})}</span>
            </div>
            <div className="info_input_box">
              <input
                type="text"
                className="info_input"
                value={accountNum}
                onChange={e => setAccountNum(e.target.value)}
              />
            </div>
          </div>
          {/* 銀行名稱 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.bankName"})}</span>
            </div>
            <div className="info_input_box">
              <select className="bank_list" onChange={e => setBankCode(e.target.value)} value={bankCode}>
              {
                bankList &&
                bankList.map((item, index) => {
                  const { code, name } = item;

                  return <option key={index} value={code}>{name}</option>;
                })
              }
              </select>
            </div>
          </div>
          {/* 開戶支行 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.branch"})}</span>
            </div>
            <div className="info_input_box">
              <input
                type="text"
                className="info_input"
                value={bankBranch}
                onChange={e => setBankBranch(e.target.value)}
              />
            </div>
          </div>
          {/* 銀行省份 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.province"})}</span>
            </div>
            <div className="info_input_box">
              <select className="bank_list" onChange={e => setBankProvince(e.target.value)} value={bankProvince}>
              {
                BankArea &&
                BankArea.map((province, index) => {
                  const { cn } = province;

                  return <option key={index} value={cn}>{cn}</option>;
                })
              }
              </select>
            </div>
          </div>
          {/* 城市 */}
          <div className="bankcard_info_group">
            <div className="info_title_box">
              <span className="info_title_txt">{props.intl.formatMessage({id: "bankCard.area"})}</span>
            </div>
            <div className="info_input_box">
              <select className="bank_list" onChange={e => setBankArea(e.target.value)} value={bankArea}>
              {
                BankArea && bankProvince != "" &&
                BankArea.map(province => {
                  return (
                    bankProvince == province.cn &&
                    province.citys.map((item, index) => {
                      const { cn } = item;
                      return <option key={index} value={cn}>{cn}</option>;
                    })
                  )
                })
              }
              </select>
            </div>
          </div>
        </div>
        <div className="info_submit_box">
          <button className="info_cancel_btn" onClick={() => props.history.goBack()}>
            {props.intl.formatMessage({id: "dialogMsg.cancel"})}
          </button>
          <button className="info_submit_btn" onClick={() => addBankCard()}>
            {props.intl.formatMessage({id: "addBankCard"})}
          </button>
        </div>
      </React.Fragment>
    );
  }

  const verifyLayout = () => {
    return (
      <React.Fragment>
        <div className="info_title_box">
          <span className="info_title">{props.intl.formatMessage({id: "bankCard.verifyBankcard"})}</span>
        </div>
        <div className="verify_step_notice_box">
          <div className="send_verify_code_box">
            <span className="go_to_txt">{props.intl.formatMessage({id: "goto"})}</span>
            <span className="user_email_txt">{userEmail}</span>
            <button className="resend_verify_code_btn" onClick={() => reSendCount <= 0 && sendVerifyCode(bankcardId)}>
            {
              reSendCount >= 0
              ? `${reSendCount}s`
              : props.intl.formatMessage({id: "reSend"})
            }
            </button>
          </div>
          <p className="verify_desc_txt">{props.intl.formatMessage({id: "verifyDesc"})}</p>
        </div>
        <div className="verify_step_box">
          <p className="verify_notice_txt">{props.intl.formatMessage({id: "verificate.inputVerifyCode"})}</p>
          <input type="text" className="verify_code_input" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
          <button className="verify_submit_btn" onClick={() => verifySubmit()}>
            {props.intl.formatMessage({id: "send"})}
          </button>
        </div>
      </React.Fragment>
    );
  }
  
	return (
		<div className="add_bankcard_page">
      { showVerifyStep ? verifyLayout() : addBankCardLayout() }
		</div>
	);
};

const mapStateToProps = ({ UserAuthData, UserBankCardData }) => {
  const { userLoginRlt } = UserAuthData;
  const { userBankCardsRlt } = UserBankCardData;
	return { userLoginRlt, userBankCardsRlt };
};

export default connect(mapStateToProps, {
  userBankCards,
  getCommunityBankList,
  addUserBankCard,
  userProfile,
  userBankCardVerifyCode,
  userBankCardVerify,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberInfo)));