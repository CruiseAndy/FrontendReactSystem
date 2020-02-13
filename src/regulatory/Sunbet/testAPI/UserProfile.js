import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userProfile,
  updateUserProfile
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ userName, setUserName ] = useState("");
  const [ userIdNum, setUserIdNum ] = useState("");
  const [ userQQ, setUserQQ ] = useState("");
  const [ userWechat, setUserWechat ] = useState("");
  const [ userBirthDay, setUserBirthDay ] = useState("");

  const userProfile = () => {
    props.userProfile(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const updateUserProfile = () => {
    const apiParams = {
			name: userName,
			id_number: userIdNum,
			qq: userQQ,
			wechat: userWechat,
			birth_day: userBirthDay
    };

    props.updateUserProfile(null, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setName = name => setUserName(name);
  const setIdNum = idNum => setUserIdNum(idNum);
  const setQQ = qq => setUserQQ(qq);
  const setWechat = wechat => setUserWechat(wechat);
  const setBirthDay = day => setUserBirthDay(day);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userProfile()} className="btn btn-primary btn-lg">User Profile</button>
      <button onClick={() => updateUserProfile()} className="btn btn-primary btn-lg">Update User Profile</button>
      <CompInput title="Name" onChange={setName} />
      <CompInput title="ID Number" onChange={setIdNum} />
      <CompInput title="QQ" onChange={setQQ} />
      <CompInput title="Wechat" onChange={setWechat} />
      <CompInput title="Birthday" onChange={setBirthDay} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userProfile,
  updateUserProfile
})(UserBankCard);