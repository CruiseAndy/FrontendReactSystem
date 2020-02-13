import { GET_COMMUNITY_BONUSES, TIMEOUT } from "./types";
import { API_COMMUNITY_BONUSES, API_COMMUNITY_BONUSES_INFO } from "./api";
import { axiosIns } from "./axiosIns"

export const getCommunityBonuses = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_COMMUNITY_BONUSES,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: GET_COMMUNITY_BONUSES,
          communityBonusesRlt: resRlt
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

// export const getCommunityBonusesDetail = id => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       axiosIns({
//         method: "get",
//         url: API_COMMUNITY_BONUSES_INFO(id),
//         headers: {
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
