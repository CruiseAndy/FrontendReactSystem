import { GLOBAL_SPINNER } from '../actions/types';

const INITIAL_STATE = {
  spinnerRlt: false
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GLOBAL_SPINNER:
			return { ...state, spinnerRlt: action.spinnerRlt };
		default:
			return state;
	}
}