/* Types */
import { SET_LOCALES } from './types';

export const setLocales = locale => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_LOCALES,
        localesRlt: locale
      })
      resolve();
    });
  }
}