/* Types */
import {
  USER_GAME_TRANSFER_HISTORY,
  USER_ALL_GAME_WALLET,
  USER_GAME_BALANCE,
  TIMEOUT
} from "./types";
import {
  API_GET_GAME_TRANSFER_RECORD,
  API_GAME_WALLET
} from "./api";
import { axiosIns } from "./axiosIns";

/* data: page, per_page, start_at, end_at, time_range, status */
export const userGameTransferHistory = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_GAME_TRANSFER_RECORD,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: USER_GAME_TRANSFER_HISTORY,
					userGameTransferHistoryRlt: resRlt
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

export const userAllGameWallet = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GAME_WALLET,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: USER_ALL_GAME_WALLET,
					userAllGameWalletRlt: resRlt
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

export const saveGameWalletBalance = (id, amount) => {
  return dispatch => {
    dispatch({
      type: USER_GAME_BALANCE,
      userGameBalanceRlt: { id, amount }
    })
  }
}