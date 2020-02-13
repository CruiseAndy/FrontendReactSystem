/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* component */
import BirthDayDatePicker from "../../../../../components/datePicker/birthDay";

/* actions */
import {
  userProfile,
  updateUserProfile,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

const MemberInfo = props => {

  const [ userProfileData, setUserProfileData ] = useState(null);

  // user data
  const [ userAccount, setUserAccount ] = useState("");
  const [ userEmail, setUserEmail ] = useState("");
  const [ userName, setUserName ] = useState("");
  const [ userQQ, setUserQQ ] = useState("");
  const [ userWechat, setUserWechat ] = useState("");
  const [ userBirthDay, setUserBirthDay ] = useState("");

  let profileOrder = {
    account: { order: 1, lang: "account" },
    email: { order: 2, lang: "center.email" },
    name: { order: 3, lang: "center.name" },
    qq: { order: 4, lang: "center.qq" },
    wechat: { order: 5, lang: "center.wechat" },
    birth_day: { order: 6, lang: "center.birth_day" },
  };

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    props.userProfile(props.intl, props.userLoginRlt.auth_token)
    .then(res => {

      Object.entries(res.profile).map(item => {
        const [ key, data ] = item;

        if (!profileOrder.hasOwnProperty(key))
          return;

        profileOrder[key] = { key, ...profileOrder[key], ...data };

        switch(key) {
          case "account":
            data.val && setUserAccount(data.val);
            break;
          case "email":
            data.val && setUserEmail(data.val);
            break;
          case "name":
            data.val && setUserName(data.val);
            break;
          case "qq":
            data.val && setUserQQ(data.val);
            break;
          case "wechat":
            data.val && setUserWechat(data.val);
            break;
          case "birth_day":
            data.val && setUserBirthDay(data.val);
            break;
          default:
            break;
        }
      });

      setUserProfileData(Object.keys(profileOrder).map(k => profileOrder[k]).sort((a, b) => a.order - b.order));
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    });

  }, [props.userLoginRlt]);

  const inputLayout = (key, disabled) => {
    switch(key) {
      case "account":
        return <input type="text" disabled={disabled} className="info_input" value={userAccount} onChange={e => setUserAccount(e.target.value)} />
      case "email":
        return <input type="text" disabled={disabled} className="info_input" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
      case "name":
        return <input type="text" disabled={disabled} className="info_input" value={userName} onChange={e => setUserName(e.target.value)} />
      case "qq":
        return <input type="text" disabled={disabled} className="info_input" value={userQQ} onChange={e => setUserQQ(e.target.value)} />
      case "wechat":
        return <input type="text" disabled={disabled} className="info_input" value={userWechat} onChange={e => setUserWechat(e.target.value)} />
      case "birth_day":
        return <BirthDayDatePicker selected={userBirthDay} onChange={date => setUserBirthDay(date)} />;
      default:
        return null;
    }
  }

  const updateUserProfile = () => {

    props.setGlobalSpinner(true);

    const apiParams = {
      name: userName,
      qq: userQQ,
      wechat: userWechat,
      birth_day: userBirthDay
    }

    props.updateUserProfile(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }
  
	return (
		<div className="member_info_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "editInfo"})}</span>
      </div>
      <div className="info_container">
      {
        userProfileData &&
        userProfileData.map((item, index) => {
          const { key, disabled, lang } = item;

          return (
            <div key={index} className="profile_info_group">
              <div className="info_title_box">
                <span className="info_title_txt">{props.intl.formatMessage({id: lang})}</span>
              </div>
              <div className="info_input_box">
              { inputLayout(key, disabled) }
              </div>
            </div>
          );
        })
      }
      </div>
      <div className="info_submit_box">
        <button className="info_submit_btn" onClick={() => updateUserProfile()}>
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
	userProfile,
  updateUserProfile,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberInfo)));