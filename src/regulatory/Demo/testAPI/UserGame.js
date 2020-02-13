import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userGameTransferHistory,
  userAllGameWallet
} from "../../../actions";

import "./index.scss"

const UserBankCard = props => {

  const userGameTransferHistory = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userGameTransferHistory(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userAllGameWallet = () => {
    props.userAllGameWallet(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => userGameTransferHistory()} className="btn btn-primary btn-lg">User Game Transfer History</button>
      <button onClick={() => userAllGameWallet()} className="btn btn-primary btn-lg">User Game All Wallet</button>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userGameTransferHistory,
  userAllGameWallet
})(UserBankCard);