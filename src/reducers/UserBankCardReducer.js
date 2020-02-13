import {
	USER_BANK_CARDS,
  ADD_USER_BANK_CARD,
	USER_BANK_CARD_VERIFY_CODE,
	USER_BANK_CARD_VERIFY
} from '../actions/types';

const INITIAL_STATE = {
	userBankCardsRlt: null,
	addUserBankCardsRlt: null,
	bankcardVerifyCodeRlt: null,
	bankcardVerifyRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_BANK_CARDS:
			return { ...state, userBankCardsRlt: action.userBankCardsRlt };
		case ADD_USER_BANK_CARD:
			return { ...state, addUserBankCardsRlt: action.addUserBankCardsRlt };
		case USER_BANK_CARD_VERIFY_CODE:
			return { ...state, bankcardVerifyCodeRlt: action.bankcardVerifyCodeRlt };
		case USER_BANK_CARD_VERIFY:
			return { ...state, bankcardVerifyRlt: action.bankcardVerifyRlt };
		default:
			return state;
	}
}