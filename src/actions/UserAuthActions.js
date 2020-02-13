/* Types */
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_CHANGE_PASSWORD,
  USER_RESET_PWD_VERIFY_CODE,
  USER_RESET_PWD,
  TIMEOUT
} from "./types";
import {
  API_USER_LOGIN,
  API_USER_LOGOUT,
  API_USER_SIGNUP,
  API_CHANGE_PASSWORD,
  API_VERIFY_PHONE_EMAIL,
  API_RESET_PWD
} from "./api";
import { axiosIns } from "./axiosIns";

export const userLogin = (intl = null, account, password) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'post',
        url: API_USER_LOGIN,
        data: { account, password },
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.loginSuccess"}) } };

        dispatch({
					type: USER_LOGIN,
					userLoginRlt: resRlt
        })
        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          let errRlt = error.response && error.response.data;

          if (errRlt.code == 1001)
            errRlt = { ...errRlt, ...{ message: intl.formatMessage({id: "apiFail.loginFail.infoFail"}) } };

          reject(errRlt);
        }
      });
    });
  };
};

export const setUserToken = data => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: USER_LOGIN,
        userLoginRlt: data
      })
      resolve();
    });
  }
}

export const userLogout = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'delete',
        url: API_USER_LOGOUT,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.logoutSuccess"}) } };

        dispatch({
					type: USER_LOGOUT,
					userLogoutRlt: resRlt
        })
        
        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          dispatch({
            type: USER_LOGOUT,
            userLogoutRlt: TIMEOUT
          })
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          dispatch({
            type: USER_LOGOUT,
            userLogoutRlt: error.response && error.response.data
          })
          reject(error.response && error.response.data);
        }
      });
    });
  };
};

/* data: account, password, password_confirmation, referral_code */
export const userSignup = (intl = null, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'post',
        url: API_USER_SIGNUP,
        data,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.registerSuccess"}) } };

        dispatch({
					type: USER_SIGNUP,
					userSignupRlt: resRlt
        })
        
        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          reject(error.response && error.response.data);
        }
      });
    });
  };
};

/* data: old_password, new_password, password_confirmation */
export const userChangePassword = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "put",
        url: API_CHANGE_PASSWORD,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.changePwdSuccess"}) } };

        dispatch({
          type: USER_CHANGE_PASSWORD,
          userChangePwdRlt: resRlt
        })

        resolve(resRlt);
      })
      .catch(error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          reject(error.response && error.response.data);
        }
      });
    });
  };
};

export const userResetPwdVerifyCode = (intl = null, contact) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_VERIFY_PHONE_EMAIL,
        params: { contact },
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.sendResetPwdVerifyCodeSuccess"}) } };

        dispatch({
          type: USER_RESET_PWD_VERIFY_CODE,
          resetPwdVerifyCodeRlt: resRlt
        })

        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          reject(error.response && error.response.data);
        }
      });
    });
  };
};

/* data: reset_password_token, new_password, password_confirmation */
export const userResetPassword = (intl = null, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'put',
        url: API_RESET_PWD,
        data,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.resetPwdSuccess"}) } };

        dispatch({
          type: USER_RESET_PWD,
          resetPwdRlt: resRlt
        })
        
        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
        }
        else {
          reject(error.response && error.response.data);
        }
      });
    });
  };
};