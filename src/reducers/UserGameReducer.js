import {
	USER_GAME_TRANSFER_HISTORY,
	USER_ALL_GAME_WALLET,
	USER_GAME_BALANCE
} from '../actions/types';

const INITIAL_STATE = {
	userGameTransferHistoryRlt: null,
	userAllGameWalletRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_GAME_TRANSFER_HISTORY:
			return { ...state, userGameTransferHistoryRlt: action.userGameTransferHistoryRlt };
		case USER_ALL_GAME_WALLET:
			let gamesInfoRlt = {};

			Object.entries(action.userAllGameWalletRlt).map(category => {
				const [ gameKind, gameData ] = category;

				gameData.map(item => {
					item.kind = gameKind;
					gamesInfoRlt[item.id] = item;
				})
			})
			return { ...state, userAllGameWalletRlt: gamesInfoRlt };
		case USER_GAME_BALANCE:
			let tmpSummary = state.userAllGameWalletRlt;

			if (action.userGameBalanceRlt.hasOwnProperty("id")) {
				tmpSummary[action.userGameBalanceRlt.id].balance = action.userGameBalanceRlt.amount;
			}

			return { ...state, userAllGameWalletRlt: tmpSummary };
		default:
			return state;
	}
}