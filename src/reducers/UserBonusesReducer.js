import {
	USER_BONUSES_HISTORY,
  USER_BONUSES_LIST
} from '../actions/types';

const INITIAL_STATE = {
	userBonusesHistroyRlt: null,
	userBonusesListRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_BONUSES_HISTORY:
			return { ...state, userBonusesHistroyRlt: action.userBonusesHistroyRlt };
		case USER_BONUSES_LIST:
			return { ...state, userBonusesListRlt: action.userBonusesListRlt };
		default:
			return state;
	}
}