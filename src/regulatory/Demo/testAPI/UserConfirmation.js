import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userConfirmAccount,
  sendVerifyCode
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ userPhone, setUserPhone ] = useState("");
  const [ userEmail, setUserEmail ] = useState("");
  const [ userConfirmToken, setUserConfirmToken ] = useState("");

  const sendVerifyCode = () => {

    let apiParams = null;

    if (userPhone != "") {
      apiParams = {
        phone_code: "china",
        phone: userPhone
      };
    }

    if (userEmail != "") {
      apiParams = {
        phone_code: "china",
        email: userEmail
      };
    }

    props.sendVerifyCode(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userConfirmAccount = () => {

    let apiParams = null;

    if (userPhone != "") {
      apiParams = {
        confirmation_token: userConfirmToken,
        method: "phone"
      };
    }

    if (userEmail != "") {
      apiParams = {
        confirmation_token: userConfirmToken,
        method: "email"
      };
    }

    props.userConfirmAccount(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setPhone = phone => setUserPhone(phone);
  const setEmail = email => setUserEmail(email);
  const setConfirmToken = token => setUserConfirmToken(token);

  return (
    <div className="api_btn_panel">
      <button onClick={() => sendVerifyCode()} className="btn btn-primary btn-lg">User Send Verify Code</button>
      <CompInput title="Phone" onChange={setPhone} />
      <CompInput title="Email" onChange={setEmail} />
      <button onClick={() => userConfirmAccount()} className="btn btn-primary btn-lg">User Confirm Account</button>
      <CompInput title="Confirm Token" onChange={setConfirmToken} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userConfirmAccount,
  sendVerifyCode
})(UserBankCard);