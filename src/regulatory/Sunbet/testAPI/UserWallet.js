import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userMainWalletWithdrawLimit,
  userAccountHistroy,
  userWalletTransferHistory,
  userOfflineDepositInfo,
  userWalletWithdraw,
  userWalletDeposit
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ transferAmount, setTtransferAmount ] = useState("");
  const [ userCatdId, setUserCatdId ] = useState("");
  const [ userDepositMethod, setUserDepositMethod ] = useState("");
  const [ userDevice, setUserDevice ] = useState("");
  const [ userBankCode, setUserBankCode ] = useState("");

  // const [ userCatdId, seUserCatdId ] = useState("");
  // const [ userCatdId, seUserCatdId ] = useState("");

  const userMainWalletWithdrawLimit = () => {
    props.userMainWalletWithdrawLimit(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userAccountHistroy = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userAccountHistroy(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userWalletTransferHistory = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userWalletTransferHistory(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userOfflineDepositInfo = () => {
    props.userOfflineDepositInfo(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userWalletWithdraw = () => {
    const apiData = {
			amount: transferAmount,
			user_card_id: userCatdId
    };

    props.userWalletWithdraw(null, props.userLoginRlt.auth_token, apiData)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userWalletDeposit = () => {
    let apiData = {
      amount: transferAmount,
      method: userDepositMethod,
			user_card_id: userCatdId
    };

    userDevice != "" && (apiData.device = userDevice);
    userBankCode != "" && (apiData.bank_code = userBankCode);

    props.userWalletDeposit(props.userLoginRlt.auth_token, apiData)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setAmount = money => setTtransferAmount(money);
  const setCatdId = id => setUserCatdId(id);
  const setDepositMethod = id => setUserDepositMethod(id);
  const setDevice = id => setUserDevice(id);
  const setBankCode = id => setUserBankCode(id);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userMainWalletWithdrawLimit()} className="btn btn-primary btn-lg">User Wallet Withdraw Limit</button>
      <button onClick={() => userAccountHistroy()} className="btn btn-primary btn-lg">User Account History</button>
      <button onClick={() => userWalletTransferHistory()} className="btn btn-primary btn-lg">User Wallet Transfer History</button>
      <button onClick={() => userOfflineDepositInfo()} className="btn btn-primary btn-lg">User Offline Deposit Info</button>
      <button onClick={() => userWalletWithdraw()} className="btn btn-primary btn-lg">User Wallet Withdraw</button>
      <CompInput title="Amount" onChange={setAmount} />
      <CompInput title="Card ID" onChange={setCatdId} />
      <button onClick={() => userWalletDeposit()} className="btn btn-primary btn-lg">User Wallet Deposit</button>
      <CompInput title="Amount" onChange={setAmount} />
      <CompInput title="Card ID" onChange={setCatdId} />
      <CompInput title="Method" onChange={setDepositMethod} />
      <CompInput title="Device" onChange={setDevice} />
      <CompInput title="Bank Code" onChange={setBankCode} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userMainWalletWithdrawLimit,
  userAccountHistroy,
  userWalletTransferHistory,
  userOfflineDepositInfo,
  userWalletWithdraw,
  userWalletDeposit
})(UserBankCard);