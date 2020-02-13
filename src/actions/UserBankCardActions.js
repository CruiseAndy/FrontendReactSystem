/* Types */
import {
  USER_BANK_CARDS,
  ADD_USER_BANK_CARD,
  USER_BANK_CARD_VERIFY_CODE,
  USER_BANK_CARD_VERIFY,
  TIMEOUT
} from "./types";
import {
  API_GET_USER_BANK_CARDS,
  API_BANK_CARD_VERIFY_CODE,
  API_BANK_CARDS_CONFIRMATION
} from "./api";
import { axiosIns } from "./axiosIns";

export const userBankCards = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_GET_USER_BANK_CARDS,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_BANK_CARDS,
          userBankCardsRlt: resRlt
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

/* data: user_name, bank_account, bank_code, sub_branch, province, area */
export const addUserBankCard = (intl = null, auth_token, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "post",
        url: API_GET_USER_BANK_CARDS,
        data,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.addUserBankCardsSuccess"}) } };

        dispatch({
          type: ADD_USER_BANK_CARD,
          addUserBankCardsRlt: resRlt
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

export const userBankCardVerifyCode = (intl = null, auth_token, cardId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_BANK_CARD_VERIFY_CODE(cardId),
        data: { cardId },
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.sendUserBankCardsVerifyCodeSuccess"}) } };

        dispatch({
          type: USER_BANK_CARD_VERIFY_CODE,
          bankcardVerifyCodeRlt: resRlt
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

/* data: confirm_token, card_id */
export const userBankCardVerify = (intl = null, auth_token, data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "post",
        url: API_BANK_CARDS_CONFIRMATION(data.card_id),
        data,
        headers: { 
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.userBankCardsVerifySuccess"}) } };

        dispatch({
          type: USER_BANK_CARD_VERIFY,
          bankcardVerifyRlt: resRlt
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