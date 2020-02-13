import { GLOBAL_ERROR_MSG, GLOBAL_INFO_MSG, GLOBAL_CONFIRM_MSG } from '../actions/types';

const INITIAL_STATE = {
  errMsgRlt: null,
  infoMsgRlt: null,
  confirmMsgRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GLOBAL_ERROR_MSG:
			return { ...state, errMsgRlt: action.errMsgRlt };
    case GLOBAL_INFO_MSG:
      return { ...state, infoMsgRlt: action.infoMsgRlt };
    case GLOBAL_CONFIRM_MSG:
      return { ...state, confirmMsgRlt: action.confirmMsgRlt };
		default:
			return state;
	}
}