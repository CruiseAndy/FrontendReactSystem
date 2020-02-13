import { combineReducers } from 'redux';
import LocalesReducer from "./LocalesReducer";
import CommunityBonusesReducer from "./CommunityBonusesReducer";
import CommunityGamesReducer from "./CommunityGamesReducer";
import CommunityPaymentsReducer from "./CommunityPaymentsReducer";
import CommunityPublicReducer from "./CommunityPublicReducer";
import UserAuthReducer from "./UserAuthReducer";
import UserBankCardReducer from "./UserBankCardReducer";
import UserBonusesReducer from "./UserBonusesReducer";
import UserBetReducer from "./UserBetReducer";
import UserConfirmationReducer from "./UserConfirmationReducer";
import UserContactReducer from "./UserContactReducer";
import UserGameReducer from "./UserGameReducer";
import UserWalletReducer from "./UserWalletReducer";
import UserNotificationReducer from "./UserNotificationReducer";
import UserProfileReducer from "./UserProfileReducer";
import UserValidBetReducer from "./UserValidBetReducer";
import GlobalMsgReducer from './GlobalMsgReducer';
import GlobalSpinnerReducer from './GlobalSpinnerReducer';

const rootReducer = combineReducers({
  LocalesData: LocalesReducer,
  CommunityBonusesData: CommunityBonusesReducer,
  CommunityGamesData: CommunityGamesReducer,
  CommunityPaymentsData: CommunityPaymentsReducer,
  CommunityPublicData: CommunityPublicReducer,
  UserAuthData: UserAuthReducer,
  UserBankCardData: UserBankCardReducer,
  UserBonusesData: UserBonusesReducer,
  UserBetData: UserBetReducer,
  UserConfirmationData: UserConfirmationReducer,
  UserContactData: UserContactReducer,
  UserGameData: UserGameReducer,
  UserWalletData: UserWalletReducer,
  UserNotificationData: UserNotificationReducer,
  UserProfileData: UserProfileReducer,
  UserValidBetData: UserValidBetReducer,
  GlobalMsgData: GlobalMsgReducer,
  GlobalSpinnerData: GlobalSpinnerReducer
});

export default rootReducer;
