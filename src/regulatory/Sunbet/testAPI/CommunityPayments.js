import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityBankList,
  getCommunityDepositBanks,
  getCommunityPayments
} from "../../../actions";

import "./index.scss"

const CommunityPayments = props => {

  const getCommunityBankList = () => {
    props.getCommunityBankList(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityDepositBanks = () => {
    props.getCommunityDepositBanks(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityPayments = () => {
    props.getCommunityPayments(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => getCommunityBankList()} className="btn btn-primary btn-lg">Get Community Bank List</button>
      <button onClick={() => getCommunityDepositBanks()} className="btn btn-primary btn-lg">Get Community Deposit Banks</button>
      <button onClick={() => getCommunityPayments()} className="btn btn-primary btn-lg">Get Community Payments</button>
    </div>
  );
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {
  getCommunityBankList,
  getCommunityDepositBanks,
  getCommunityPayments
})(CommunityPayments);