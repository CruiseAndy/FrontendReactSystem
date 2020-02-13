import {
	USER_MAIN_WALLET_WITHDRAW_LIMIT,
	USER_ACCOUNT_HISTORY,
	USER_WALLET_TRANSFER_HISTORY,
	USER_OFFLINE_DEPOSIT_INFO,
	USER_WALLET_WITHDRAW,
	USER_WALLET_DEPOSIT,
	GET_MAIN_WALLET
} from '../actions/types';

const INITIAL_STATE = {
	userWalletBalance: 0,
	userWalletWithdrawLimitRlt: null,
	userAccountHistorydata: null,
	userWalletTransferHistoryRlt: null,
	userOfflineDepositInfoRlt: null,
	userWalletWithdrawRlt: null,
	userWalletDepositRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GET_MAIN_WALLET:
			return { ...state, userWalletBalance: action.userWalletBalance };
		case USER_MAIN_WALLET_WITHDRAW_LIMIT:
			return { ...state, userWalletWithdrawLimitRlt: action.userWalletWithdrawLimitRlt };
		case USER_ACCOUNT_HISTORY:
			return { ...state, userAccountHistorydata: action.userAccountHistorydata };
		case USER_WALLET_TRANSFER_HISTORY:
			return { ...state, userWalletTransferHistoryRlt: action.userWalletTransferHistoryRlt };
		case USER_OFFLINE_DEPOSIT_INFO:
			return { ...state, userOfflineDepositInfoRlt: action.userOfflineDepositInfoRlt };
		case USER_WALLET_WITHDRAW:
			return { ...state, userWalletWithdrawRlt: action.userWalletWithdrawRlt };
		case USER_WALLET_DEPOSIT:
			return { ...state, userWalletDepositRlt: action.userWalletDepositRlt };
		default:
			return state;
	}
}