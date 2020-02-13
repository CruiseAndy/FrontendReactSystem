import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userBetHistory
} from "../../../actions";

import "./index.scss"

const UserBankCard = props => {

  const userBetHistory = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userBetHistory(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => userBetHistory()} className="btn btn-primary btn-lg">User Bonuses Histoty</button>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userBetHistory
})(UserBankCard);