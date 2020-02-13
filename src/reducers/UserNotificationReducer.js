import {
	USER_NOTIFICATION
} from '../actions/types';

const INITIAL_STATE = {
	userNotificationRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_NOTIFICATION:
			return { ...state, userNotificationRlt: action.userNotificationRlt };
		default:
			return state;
	}
}