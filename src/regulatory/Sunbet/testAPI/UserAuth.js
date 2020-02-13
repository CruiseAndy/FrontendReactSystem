import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userLogin,
  userLogout,
  userSignup,
  userChangePassword,
  userResetPwdVerifyCode,
  userResetPassword
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserAuth = props => {

  const [ userAccount, setUserAccount ] = useState("");
  const [ userPassword, setUserPassword ] = useState("");

  const [ userSignupAccount, setUserSignupAccount ] = useState("");
  const [ userSignupPassword, setUserSignupPassword ] = useState("");
  const [ userSignupConfirmPwd, setUserSignupConfirmPwd ] = useState("");
  const [ userSignupReferralCode, setUserSignupReferralCode ] = useState("");

  const [ userChangePwdOldPwd, setUserChangePwdOldPwd ] = useState("");
  const [ userChangePwdNewPwd, setUserChangePwdNewPwd ] = useState("");
  const [ userChangePwdConfirmPwd, setUserChangePwdConfirmPwd ] = useState("");

  const [ userContact, setUserContact ] = useState("");

  const [ userVerifyCode, setUserVerifyCode ] = useState("");
  const [ userNewPwd, setUserNewPwd ] = useState("");
  const [ userConfirmPwd, setUserConfirmPwd ] = useState("");

  const userLogin = () => {
    props.userLogin(userAccount, userPassword)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userLogout = () => {
    props.userLogout(props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userSignup = () => {
    const apiParams = {
			account: userSignupAccount,
			password: userSignupPassword,
			password_confirmation: userSignupConfirmPwd,
			referral_code: userSignupReferralCode
    };

    props.userSignup(props.intl, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userChangePassword = () => {
    const apiParams = {
			old_password: userChangePwdOldPwd,
			new_password: userChangePwdNewPwd,
			password_confirmation: userChangePwdConfirmPwd
    };

    props.userChangePassword(props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userResetPwdVerifyCode = () => {
    props.userResetPwdVerifyCode(userContact)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userResetPassword = () => {
    const apiParams = {
			reset_password_token: userVerifyCode,
			new_password: userNewPwd,
			password_confirmation: userConfirmPwd
    };

    props.userResetPassword(apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const setAccount = acc => setUserAccount(acc);
  const setPassword = pwd => setUserPassword(pwd);

  const setSignupAccount = acc => setUserSignupAccount(acc);
  const setSignupPassword = pwd => setUserSignupPassword(pwd);
  const setSignupConfirmPwd = confirmPwd => setUserSignupConfirmPwd(confirmPwd);
  const setSignupReferralCode = referralCode => setUserSignupReferralCode(referralCode);

  const setChangePwdOldPwd = oldPwd => setUserChangePwdOldPwd(oldPwd);
  const setChangePwdNewPwd = NewPwd => setUserChangePwdNewPwd(NewPwd);
  const setChangePwdConfirmPwd = confirmPwd => setUserChangePwdConfirmPwd(confirmPwd);

  const setContact = confirmPwd => setUserContact(confirmPwd);

  const setVerifyCode = oldPwd => setUserVerifyCode(oldPwd);
  const setNewPwd = NewPwd => setUserNewPwd(NewPwd);
  const setConfirmPwd = confirmPwd => setUserConfirmPwd(confirmPwd);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userLogin()} className="btn btn-primary btn-lg">User Login</button>
      <CompInput title="Account" onChange={setAccount} />
      <CompInput title="Password" onChange={setPassword} />
      <button onClick={() => userLogout()} className="btn btn-primary btn-lg">User Logout</button>
      <button onClick={() => userSignup()} className="btn btn-primary btn-lg">User Signup</button>
      <CompInput title="Account" onChange={setSignupAccount} />
      <CompInput title="Password" onChange={setSignupPassword} />
      <CompInput title="Confirm Pwd" onChange={setSignupConfirmPwd} />
      <CompInput title="Referral Code" onChange={setSignupReferralCode} />
      <button onClick={() => userChangePassword()} className="btn btn-primary btn-lg">User Change Password</button>
      <CompInput title="Old Password" onChange={setChangePwdOldPwd} />
      <CompInput title="New Password" onChange={setChangePwdNewPwd} />
      <CompInput title="Confirm Pwd" onChange={setChangePwdConfirmPwd} />
      <button onClick={() => userResetPwdVerifyCode()} className="btn btn-primary btn-lg">User Reset Password Verify Code</button>
      <CompInput title="Contact" onChange={setContact} />
      <button onClick={() => userResetPassword()} className="btn btn-primary btn-lg">User Reset Password</button>
      <CompInput title="Verify Code" onChange={setVerifyCode} />
      <CompInput title="New Password" onChange={setNewPwd} />
      <CompInput title="Confirm Pwd" onChange={setConfirmPwd} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userLogin,
  userLogout,
  userSignup,
  userChangePassword,
  userResetPwdVerifyCode,
  userResetPassword
})(UserAuth);