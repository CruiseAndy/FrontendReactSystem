/* Types */
import {
  GET_COMMUNITY_FAQ,
  GET_COMMUNITY_NEWS,
  GET_COMMUNITY_APP_CAROUSEL,
  GET_COMMUNITY_CAROUSEL,
  GET_COMMUNITY_PRELOAD,
  TIMEOUT
} from "./types";
import {
  API_FAQ,
  API_NEWS,
  API_GET_APP_CAROUSEL,
  API_GET_CAROUSEL,
  API_PRELOAD
} from "./api";
import { axiosIns } from "./axiosIns";

export const getCommunityFAQ = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_FAQ,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: GET_COMMUNITY_FAQ,
          communityFAQRlt: resRlt
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

export const getCommunityNews = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: "get",
        url: API_NEWS,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then(res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
          type: GET_COMMUNITY_NEWS,
          communityNewsRlt: resRlt
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

export const getCommunityAppCarousel = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_APP_CAROUSEL,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: GET_COMMUNITY_APP_CAROUSEL,
					communityAppSlideRlt: resRlt
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

export const getCommunityCarousel = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_GET_CAROUSEL,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
        let resRlt = res.data && res.data.content;
        
        dispatch({
					type: GET_COMMUNITY_CAROUSEL,
					communitySlideRlt: resRlt
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

export const getCommunityPreload = (intl = null) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosIns({
        method: 'get',
        url: API_PRELOAD,
        headers: {
          locale: getState().LocalesData.localesRlt
        }
      })
      .then( res => {
				dispatch({
					type: GET_COMMUNITY_PRELOAD,
					communityPreloadRlt: res.data && res.data.content
				})
        resolve(res.data && res.data.content);
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