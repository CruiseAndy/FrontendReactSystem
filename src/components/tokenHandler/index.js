/* tools */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* actions */
import { setUserToken, userProfile } from "../../actions";

const TokenHandler = props => {

  let firstShowPage = true;

  useEffect(() => {
    window.addEventListener('storage', storageChanged);
    storageChanged();
    
    return () => {
			window.removeEventListener('storage', storageChanged);
    }
	}, []);

	const storageChanged = () => {

    // if (!props.siteConfig.login.remember)
    //   return;
    
    const hasUserToken = localStorage.hasOwnProperty(`${props.siteConfig.company}-session`);

    if (hasUserToken) {
      const userLoginData = JSON.parse(localStorage.getItem(`${props.siteConfig.company}-session`));

      props.userProfile(props.intl, userLoginData.auth_token)
      .then(res => {
        props.setUserToken(userLoginData);
      })
      .catch(err => {
        localStorage.removeItem(`${props.siteConfig.company}-session`);
        props.history.push("/");
      })
    }
    else {
      const nowPage = props.history.location.pathname.split("/")[1];

      if (props.needLoginPage.includes(nowPage)) {
        props.history.push("/");
        location.reload();
      }
      else {
        if (firstShowPage) {
          props.history.push(props.history.location.pathname);
          firstShowPage = false;
        }
        else
          location.reload();
      }
    }
	}

  return (
    <div style={{ width: "1px", height: "1px", opacity: 0, position: "absolute" }}></div>
  );
}

const mapStateToProps = () => { return {} };

export default connect(mapStateToProps, {
  setUserToken,
  userProfile
})(withRouter(TokenHandler));