import { GET_COMMUNITY_GAMES_INFO } from '../actions/types';

const INITIAL_STATE = {
  communityGamesRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GET_COMMUNITY_GAMES_INFO:
			return { ...state, communityGamesRlt: action.communityGamesRlt };
		default:
			return state;
	}
}