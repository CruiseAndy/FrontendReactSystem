import {
	USER_CONTACT
} from '../actions/types';

const INITIAL_STATE = {
	userContactRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_CONTACT:
			return { ...state, userContactRlt: action.userContactRlt };
		default:
			return state;
	}
}