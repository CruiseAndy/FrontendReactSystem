/* Types */
import {
  GLOBAL_ERROR_MSG,
  GLOBAL_INFO_MSG,
  GLOBAL_CONFIRM_MSG
} from "./types"; 

/**
 * error control
 */
export const setGlobalErrMsg = msg => {
  return dispatch => {
    dispatch({
      type: GLOBAL_ERROR_MSG,
      errMsgRlt: msg
    })
  }
}

export const clearGlobalErrMsg = () => {
  return dispatch => {
    dispatch({
      type: GLOBAL_ERROR_MSG,
      errMsgRlt: null
    })
  }
}

/**
 * infomation control
 */
export const setGlobalInfoMsg = msg => {
  return dispatch => {
    dispatch({
      type: GLOBAL_INFO_MSG,
      infoMsgRlt: msg
    })
  }
}

export const clearGlobalInfoMsg = () => {
  return dispatch => {
    dispatch({
      type: GLOBAL_INFO_MSG,
      infoMsgRlt: null
    })
  }
}

/**
 * confirm control
 */
export const setGlobalConfirmMsg = obj => {
  return dispatch => {
    dispatch({
      type: GLOBAL_CONFIRM_MSG,
      confirmMsgRlt: obj
    })
  }
}

export const clearGlobalConfirmMsg = () => {
  return dispatch => {
    dispatch({
      type: GLOBAL_CONFIRM_MSG,
      confirmMsgRlt: null
    })
  }
}