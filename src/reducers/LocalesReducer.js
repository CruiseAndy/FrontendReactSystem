import { SET_LOCALES } from '../actions/types';
import SiteConfig from "../regulatory/Demo/config";

const INITIAL_STATE = {
  localesRlt: SiteConfig.defaultLocale
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case SET_LOCALES:
			return { ...state, localesRlt: action.localesRlt };
		default:
			return state;
	}
}