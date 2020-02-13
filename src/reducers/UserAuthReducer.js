import {
	USER_LOGIN,
  USER_LOGOUT,
	USER_SIGNUP,
	USER_CHANGE_PASSWORD,
	USER_RESET_PWD_VERIFY_CODE,
	USER_RESET_PWD
} from '../actions/types';

const INITIAL_STATE = {
	userLoginRlt: null,
	userLogoutRlt: null,
	userSignupRlt: null,
	userChangePwdRlt: null,
	resetPwdVerifyCodeRlt: null,
	resetPwdRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_LOGIN:
			return { ...state, userLoginRlt: action.userLoginRlt };
		case USER_LOGOUT:
			return { ...state, userLogoutRlt: action.userLogoutRlt, userLoginRlt: null, userSignupRlt: null };
		case USER_SIGNUP:
			return { ...state, userSignupRlt: action.userSignupRlt, userLoginRlt: action.userSignupRlt };
		case USER_CHANGE_PASSWORD:
			return { ...state, userChangePwdRlt: action.userChangePwdRlt };
		case USER_RESET_PWD_VERIFY_CODE:
			return { ...state, resetPwdVerifyCodeRlt: action.resetPwdVerifyCodeRlt };
		case USER_RESET_PWD:
			return { ...state, resetPwdRlt: action.resetPwdRlt };
		default:
			return state;
	}
}