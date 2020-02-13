/* Types */
import {
  GET_COMMUNITY_BANK_LIST,
  GET_COMMUNITY_DEPOSIT_BANKS,
  GET_COMMUNITY_PAYMENTS,
  TIMEOUT
} from "./types";
import { API_GET_COMPANY_BANK_LIST, API_COMMUNITY_DEPOSIT_BANK, API_GET_PAYMENTS } from "./api";
import { axiosIns } from "./axiosIns";

export const getCommunityBankList = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_GET_COMPANY_BANK_LIST,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: GET_COMMUNITY_BANK_LIST,
          communityBankListRlt: resRlt
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

export const getCommunityDepositBanks = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_COMMUNITY_DEPOSIT_BANK,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: GET_COMMUNITY_DEPOSIT_BANKS,
					communityDepositBanksRlt: resRlt
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

export const getCommunityPayments = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_PAYMENTS,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: GET_COMMUNITY_PAYMENTS,
					communityPaymentsRlt: resRlt
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