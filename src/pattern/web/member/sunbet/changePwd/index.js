/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userChangePassword,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

import "./index.scss";

const MemberChangePwd = props => {

  const [ oldPwd, setOldPwd ] = useState("");
  const [ newPwd, setNewPwd ] = useState("");
  const [ newPwdConfirm, setNewPwdConfirm ] = useState("");

  const changePassword = () => {
    props.setGlobalSpinner(true);

    const apiParams = {
      old_password: oldPwd,
      new_password: newPwd,
      password_confirmation: newPwdConfirm
    }

    props.userChangePassword(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(err.message);
    });
  }
  
	return (
		<div className="member_change_pwd_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "changePwd.title"})}</span>
      </div>
      <div className="info_container">
        <div className="profile_info_group">
          <div className="info_title_box">
            <span className="info_title_txt">{props.intl.formatMessage({id: "changePwd.oldPassword"})}</span>
          </div>
          <div className="info_input_box">
            <input type="password" className="info_input" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
          </div>
        </div>
        <div className="profile_info_group">
          <div className="info_title_box">
            <span className="info_title_txt">{props.intl.formatMessage({id: "changePwd.newPassword"})}</span>
          </div>
          <div className="info_input_box">
            <input type="password" className="info_input" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
          </div>
        </div>
        <div className="profile_info_group">
          <div className="info_title_box">
            <span className="info_title_txt">{props.intl.formatMessage({id: "changePwd.confirmPassword"})}</span>
          </div>
          <div className="info_input_box">
            <input type="password" className="info_input" value={newPwdConfirm} onChange={e => setNewPwdConfirm(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="info_submit_box">
        <button className="info_submit_btn" onClick={() => changePassword()}>
          {props.intl.formatMessage({id: "send"})}
        </button>
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userChangePassword,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberChangePwd)));