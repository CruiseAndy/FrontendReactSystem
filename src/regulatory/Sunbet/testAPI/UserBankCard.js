import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userBankCards,
  addUserBankCard,
  userBankCardVerifyCode,
  userBankCardVerify
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ userName, setUserName ] = useState("");
  const [ userBankAccount, setUserBankAccount ] = useState("");
  const [ userBankCode, setUserBankCode ] = useState("");
  const [ userBankBranch, setUserBankBranch ] = useState("");
  const [ userBankProvince, setUserBankProvince ] = useState("");
  const [ userBankArea, setUserBankArea ] = useState("");

  const [ userBankCardId, setUserBankCardId ] = useState("");
  const [ userVerifyCode, setUserVerifyCode ] = useState("");

  const userBankCards = () => {
    props.userBankCards(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const addUserBankCard = () => {
    const apiParams = {
			user_name: userName,
			bank_account: userBankAccount,
			bank_code: userBankCode,
			sub_branch: userBankBranch,
			province: userBankProvince,
			area: userBankArea
    };

    props.addUserBankCard(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userBankCardVerifyCode = () => {
    props.userBankCardVerifyCode(null, props.userLoginRlt.auth_token, userBankCardId)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userBankCardVerify = () => {
    const apiParams = {
			confirm_token: userVerifyCode,
			card_id: userBankCardId
    };

    props.userBankCardVerify(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setName = name => setUserName(name);
  const setBankAccount = acc => setUserBankAccount(acc);
  const setBankCode = code => setUserBankCode(code);
  const setBankBranch = brnach => setUserBankBranch(brnach);
  const setBankProvince = province => setUserBankProvince(province);
  const setBankArea = area => setUserBankArea(area);

  const setBankCardId = id => setUserBankCardId(id);
  const setVerifyCode = NewPwd => setUserVerifyCode(NewPwd);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userBankCards()} className="btn btn-primary btn-lg">User Bank Cards</button>
      <button onClick={() => addUserBankCard()} className="btn btn-primary btn-lg">User Add Bank Card</button>
      <CompInput title="Name" onChange={setName} />
      <CompInput title="Bank Account" onChange={setBankAccount} />
      <CompInput title="Bank Code" onChange={setBankCode} />
      <CompInput title="Bank Brandh" onChange={setBankBranch} />
      <CompInput title="Bank Province" onChange={setBankProvince} />
      <CompInput title="Bank Area" onChange={setBankArea} />
      <button onClick={() => userBankCardVerifyCode()} className="btn btn-primary btn-lg">User Bank Card Verify Code</button>
      <button onClick={() => userBankCardVerify()} className="btn btn-primary btn-lg">User Bank Card Verify</button>
      <CompInput title="Bank Card ID" onChange={setBankCardId} />
      <CompInput title="Bank Card Verify Code" onChange={setVerifyCode} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userBankCards,
  addUserBankCard,
  userBankCardVerifyCode,
  userBankCardVerify
})(UserBankCard);