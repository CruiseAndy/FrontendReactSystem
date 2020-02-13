/* Types */
import {
  USER_BONUSES_HISTORY,
  USER_BONUSES_LIST,
  TIMEOUT
} from "./types";
import {
  API_GET_BONUSES_HISTORY,
  API_BONUSES,
  API_BONUSES_APPLY,
  API_BONUSES_INFO
} from "./api";
import { axiosIns } from "./axiosIns";

/* data: page, per_page, start_at, end_at, time_range, status */
export const userBonusesHistroy = (intl = null, auth_token, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_GET_BONUSES_HISTORY,
        params,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_BONUSES_HISTORY,
          userBonusesHistroyRlt: resRlt
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

export const userBonusesList = (intl = null, auth_token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_BONUSES,
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: USER_BONUSES_LIST,
          userBonusesListRlt: resRlt
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

export const userBonusesApply = (intl = null, auth_token, bonus_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "post",
        url: API_BONUSES_APPLY(bonus_id),
        data: { bonus_id },
        headers: {
          "Auth-Token": auth_token,
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        resRlt = { ...resRlt, ...{ message: intl.formatMessage({id: "apiSuccess.bonusesApplySuccess"}) } };
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

// export const userBonusesDetail = (auth_token, bonus_id) => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       axiosIns({
//         method: "get",
//         url: API_BONUSES_INFO(bonus_id),
//         headers: {
//           "Auth-Token": auth_token,
//           locale: getState().LocalesData.localesRlt
//         }
//       })
//       .then(res => {
//         resolve(res.data && res.data.content);
//       })
//       .catch(error => {
//         if (error.request && error.request.readyState == 4 && error.request.status == 0) {
//           reject({ message: intl.formatMessage({id: "apiFail.timeoutFail"}) });
//         }
//         else {
//           reject(error.response && error.response.data);
//         }
//       });
//     });
//   };
// };