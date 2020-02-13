import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userContact
} from "../../../actions";

import "./index.scss"

const UserBankCard = props => {

  const userContact = () => {
    props.userContact(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => userContact()} className="btn btn-primary btn-lg">User Contact</button>
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userContact
})(UserBankCard);