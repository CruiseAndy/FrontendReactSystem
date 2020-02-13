import {
	GET_COMMUNITY_FAQ,
  GET_COMMUNITY_NEWS,
  GET_COMMUNITY_APP_CAROUSEL,
	GET_COMMUNITY_CAROUSEL,
	GET_COMMUNITY_PRELOAD
} from '../actions/types';

const INITIAL_STATE = {
	communityFAQRlt: null,
	communityNewsRlt: null,
	communityAppSlideRlt: null,
	communitySlideRlt: null,
	communityPreloadRlt: null
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case GET_COMMUNITY_FAQ:
			return { ...state, communityFAQRlt: action.communityFAQRlt };
		case GET_COMMUNITY_NEWS:
			return { ...state, communityNewsRlt: action.communityNewsRlt };
		case GET_COMMUNITY_APP_CAROUSEL:
			return { ...state, communityAppSlideRlt: action.communityAppSlideRlt };
		case GET_COMMUNITY_CAROUSEL:
			return { ...state, communitySlideRlt: action.communitySlideRlt };
		case GET_COMMUNITY_PRELOAD:
			return { ...state, communityPreloadRlt: action.communityPreloadRlt };
		default:
			return state;
	}
}