import {
	USER_CONFIRM_ACCOUNT,
  USER_SEND_VERIFY_CODE
} from '../actions/types';

const INITIAL_STATE = {
	userConfirmAccountRlt: null,
	userSendVerifyCodeRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_CONFIRM_ACCOUNT:
			return { ...state, userConfirmAccountRlt: action.userConfirmAccountRlt };
		case USER_SEND_VERIFY_CODE:
			return { ...state, userSendVerifyCodeRlt: action.userSendVerifyCodeRlt };
		default:
			return state;
	}
}