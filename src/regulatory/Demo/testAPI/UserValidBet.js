import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userValidBetHistroy
} from "../../../actions";

import "./index.scss"

const UserBankCard = props => {

  const userValidBetHistroy = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userValidBetHistroy(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => userValidBetHistroy()} className="btn btn-primary btn-lg">User Valid Bet History</button>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userValidBetHistroy
})(UserBankCard);