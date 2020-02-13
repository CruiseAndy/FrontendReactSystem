import { GET_COMMUNITY_BONUSES } from '../actions/types';

const INITIAL_STATE = {
  communityBonusesRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GET_COMMUNITY_BONUSES:
			return { ...state, communityBonusesRlt: action.communityBonusesRlt };
		default:
			return state;
	}
}