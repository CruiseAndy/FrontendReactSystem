/* Types */
import {
  USER_CONFIRM_ACCOUNT,
  USER_SEND_VERIFY_CODE,
  TIMEOUT
} from "./types";
import {
  API_VERIFY_ACCOUNT,
  API_SEND_VERIFY_CODE
} from "./api";
import { axiosIns } from "./axiosIns";

/* data: confirmation_token, method */
export const userConfirmAccount = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_VERIFY_ACCOUNT,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.accountVerifySuccess"}) } };

        dispatch({
					type: USER_CONFIRM_ACCOUNT,
					userConfirmAccountRlt: resRlt
        })
        
        resolve(resRlt);
      })
      .catch( error => {
        if (error.request && error.request.readyState == 4 && error.request.status == 0) {
          // reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
          resolve();
        }
        else {
          reject(error.response && error.response.data);
        }
      });
    });
  };
};

/* data: phone_code, phone, email */
export const sendVerifyCode = (intl = null, auth_token, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'post',
        url: API_SEND_VERIFY_CODE,
        data,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.sendAccountVerifyCodeSuccess"}) } };

        dispatch({
					type: USER_SEND_VERIFY_CODE,
					userSendVerifyCodeRlt: resRlt
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