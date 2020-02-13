import {
	USER_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
	userProfileRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_PROFILE:
			return { ...state, userProfileRlt: action.userProfileRlt };
		default:
			return state;
	}
}