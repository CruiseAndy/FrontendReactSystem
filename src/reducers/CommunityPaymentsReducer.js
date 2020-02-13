import {
	GET_COMMUNITY_GAMES_INFO,
	GET_COMMUNITY_DEPOSIT_BANKS,
	GET_COMMUNITY_PAYMENTS
} from '../actions/types';

const INITIAL_STATE = {
	communityGamesRlt: null,
	communityDepositBanksRlt: null,
	communityPaymentsRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GET_COMMUNITY_GAMES_INFO:
			return { ...state, communityGamesRlt: action.communityGamesRlt };
		case GET_COMMUNITY_DEPOSIT_BANKS:
			return { ...state, communityDepositBanksRlt: action.communityDepositBanksRlt };
		case GET_COMMUNITY_PAYMENTS:
			return { ...state, communityPaymentsRlt: action.communityPaymentsRlt };
		default:
			return state;
	}
}