import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userNotification,
  changeNotificationStatus
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ userNotificationId, setUserNotificationId ] = useState("");

  const userNotification = () => {
    props.userNotification(null, props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const changeNotificationStatus = () => {
    props.changeNotificationStatus(null, props.userLoginRlt.auth_token, userNotificationId)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setNotificationId = id => setUserNotificationId(id);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userNotification()} className="btn btn-primary btn-lg">User Notification</button>
      <button onClick={() => changeNotificationStatus()} className="btn btn-primary btn-lg">Change Notification Status</button>
      <CompInput title="Notification ID" onChange={setNotificationId} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userNotification,
  changeNotificationStatus
})(UserBankCard);