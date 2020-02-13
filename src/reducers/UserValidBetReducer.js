import {
	USER_VALID_BET_HISTORY
} from '../actions/types';

const INITIAL_STATE = {
	userValidBetHistroyRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_VALID_BET_HISTORY:
			return { ...state, userValidBetHistroyRlt: action.userValidBetHistroyRlt };
		default:
			return state;
	}
}