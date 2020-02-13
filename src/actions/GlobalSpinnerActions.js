/* Types */
import { GLOBAL_SPINNER } from "./types"; 

/**
 * error control
 */
export const setGlobalSpinner = bool => {
  return dispatch => {
    dispatch({
      type: GLOBAL_SPINNER,
      spinnerRlt: bool
    })
  }
}