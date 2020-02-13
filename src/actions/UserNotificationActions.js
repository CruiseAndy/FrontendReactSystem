/* Types */
import {
  USER_NOTIFICATION,
  TIMEOUT
} from "./types";
import {
  API_USER_NOTIFICATION,
  API_USER_NOTIFICATION_UPDATE
} from "./api";
import { axiosIns } from "./axiosIns";

export const userNotification = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_USER_NOTIFICATION,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_NOTIFICATION,
          userNotificationRlt: resRlt
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

export const changeNotificationStatus = (intl = null, auth_token, id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "put",
        url: API_USER_NOTIFICATION_UPDATE(id),
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.changeUserNotificationStatusSuccess"}) } };
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