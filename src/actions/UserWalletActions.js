/* Types */
import {
  USER_MAIN_WALLET_WITHDRAW_LIMIT,
  USER_ACCOUNT_HISTORY,
  USER_WALLET_TRANSFER_HISTORY,
  USER_OFFLINE_DEPOSIT_INFO,
  USER_WALLET_WITHDRAW,
  USER_WALLET_DEPOSIT,
  GET_MAIN_WALLET,
  TIMEOUT
} from "./types";
import {
  API_GET_MAIN_WALLET_WITHDRAW_LINIT,
  API_GET_ACCOUNT_HISTORY,
  API_GET_MAIN_WALLET_HISTORY,
  API_GET_OFFLINE_DEPOSIT_INFO,
  API_MAIN_WALLET_WITHDRAW,
  API_MAIN_WALLET_DEPOSIT
} from "./api";
import { axiosIns } from "./axiosIns";

export const saveMainWalletBalance = balance => {
  return dispatch => {
    dispatch({
      type: GET_MAIN_WALLET,
      userWalletBalance: balance
    })
  }
}

export const userMainWalletWithdrawLimit = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_MAIN_WALLET_WITHDRAW_LINIT,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
       
        dispatch({
					type: USER_MAIN_WALLET_WITHDRAW_LIMIT,
					userWalletWithdrawLimitRlt: resRlt
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

/* data: page, per_page, start_at, end_at, time_range, status */
export const userAccountHistroy = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_GET_ACCOUNT_HISTORY,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_ACCOUNT_HISTORY,
          userAccountHistorydata: resRlt
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

/* data: page, per_page, start_at, end_at, time_range, status */
export const userWalletTransferHistory = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_MAIN_WALLET_HISTORY,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_WALLET_TRANSFER_HISTORY,
          userWalletTransferHistoryRlt: resRlt
        });

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

export const userOfflineDepositInfo = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_OFFLINE_DEPOSIT_INFO,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: USER_OFFLINE_DEPOSIT_INFO,
					userOfflineDepositInfoRlt: resRlt
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

/* data: amount, user_card_id */
export const userWalletWithdraw = (intl = null, auth_token, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'post',
        url: API_MAIN_WALLET_WITHDRAW,
        data,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.userWithdrawSuccess"}) } };

        dispatch({
					type: USER_WALLET_WITHDRAW,
					userWalletWithdrawRlt: resRlt
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

/* data: amount, method, bank_code, device, user_card_id,
        offline_data[bank_name], offline_data[remark], offline_data[bank_account],
        offline_data[bank_card_id], offline_data[transfer_method] */
export const userWalletDeposit = (intl = null, auth_token, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'post',
        url: API_MAIN_WALLET_DEPOSIT,
        data,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.userDepositSuccess"}) } };

        dispatch({
					type: USER_WALLET_DEPOSIT,
					userWalletDepositRlt: resRlt
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