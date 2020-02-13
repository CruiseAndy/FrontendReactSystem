import {
	USER_BET_HISTORY
} from '../actions/types';

const INITIAL_STATE = {
	userBetHistoryRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_BET_HISTORY:
			return { ...state, userBetHistoryRlt: action.userBetHistoryRlt };
		default:
			return state;
	}
}