/* Types */
import {
  USER_BET_HISTORY,
  TIMEOUT
} from "./types";
import {
  API_GET_BET_HISTORY
} from "./api";
import { axiosIns } from "./axiosIns";

/* data: page, per_page, start_at, end_at, time_range, status */
export const userBetHistory = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_GET_BET_HISTORY,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_BET_HISTORY,
          userBetHistoryRlt: resRlt
        });
        
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