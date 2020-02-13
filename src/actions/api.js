//============== community APIs ==================
/**
 * @description: For Preloading
 * @return {content} content object represents the { app_version ,download_ipa_url, download_apk_url, redirect_download_url, register_column, confirmation_methods, game_categories, game_partners }
 */
export const API_PRELOAD = `/community/preload`;

/**
 * @description: For slides banners
 * @return {content} content array represents the [ webImageUrl, mobileImageUrl, linkPath ]
 */
export const API_GET_APP_CAROUSEL = `/community/app_slides`;

/**
 * @description: For slides banners
 * @return {content} content array represents the [ webImageUrl, mobileImageUrl, linkPath ]
 */
export const API_GET_CAROUSEL = `/community/slides`;

/**
 * @description: Get Bank List of Supported Bank Cards
 * @return {content} content array represents the [ ...cards ]
 */
export const API_GET_COMPANY_BANK_LIST = `/community/card_banks`;

/**
 * @description: Get games
 * @param {boolean}: is_mobile (default is true)
 * @param {string}: category
 * @return {content} content array represents the { ...gameTypes: [ ...games ] }
 */
export const API_COMMUNITY_GAMES = `/community/games`;

/**
 * @description: Get all Payments Methods
 * @return {content} content object represents the { ...[ id, app_page, type, name, min, max, step, status, image_url ] }
 */
export const API_GET_PAYMENTS = `/community/payments`;

/**
 * @description: Get news
 * @return {content} content object represents the { ...[ title, content, updated_at ] }
 */
export const API_NEWS = `/community/news`;

/**
 * @description: Get FAQ
 * @return {content} content object represents the { ...type: [ ...{order, question, answer} ] }
 */
export const API_FAQ = `/community/qa`;

/**
 * @description: Get bonuses
 * @return {content} content object represents the { content: [ {}, {},... ] }
 */
export const API_COMMUNITY_BONUSES = `/community/bonuses`;

/**
 * @description: Get Single Bonus Details
 * @param {integer}: bonus_id
 * @return {content} content object represents the {{id, name, status, apply_by, bonus_order, genre, image, apply_message, detail, start_at, end_at}}
 */
export const API_COMMUNITY_BONUSES_INFO = bonus_id => `${API_COMMUNITY_BONUSES}/${bonus_id}`;

/**
 * @description: Get deposit bank
 * @return {content} content object represents the { content: [ {}, {},... ] }
 */
export const API_COMMUNITY_DEPOSIT_BANK = `/community/deposit_banks`;

//================== user APIs =====================
/**
 * @description: For Contact
 * @param {string}: auth_token
 * @return {content} content object represents the { ...{content, image_url} }
 */
export const API_CONTACT = `/user/contact_informations`;

/**
 * @description: For login
 * @param {string}: account
 * @param {string}: password
 * @return {content} content object represents the { message, account, user_confirmed, user_status, auth_token, has_notifications }
 */
export const API_USER_LOGIN = `/user/login`;

/**
 * @description: For logout
 * @param {string}: auth_token
 * @return {content} content object represents the { message }
 */
export const API_USER_LOGOUT = `/user/logout`;

/**
 * @description: Create new user
 * @param {string}: account
 * @param {string}: password
 * @param {string}: password_confirmation
 * @param {string}: referral_code
 * @return {content} content object represents the { message, user_status, auth_token, account  }
 */
export const API_USER_SIGNUP = `/user/signup`;

/**
 * @method: POST
 * @description: Create User Confirmation Token
 * @param {string}: phone_code
 * @param {string}: phone
 * @param {string}: email
 * @return {content} content object represents the { message }
 */
export const API_SEND_VERIFY_CODE = `/user/confirmation`;

/**
 * @method: GET
 * @description: Pass User Confirmation Token to Verify
 * @param {string}: confirmation_token
 * @param {string}: method
 * @return {content} content object represents the { message, account, auth_token, user_status }
 */
export const API_VERIFY_ACCOUNT = `/user/confirmation`;

/**
 * @description: Forget Password to Send Reset Code
 * @param {string}: contact
 * @return {content} content object represents the { message, code(staging) }
 */
export const API_VERIFY_PHONE_EMAIL = `/user/reset_password_token`;

/**
 * @method: PUT
 * @description: Reset New Password
 * @param {string}: reset_password_token
 * @param {string}: new_password
 * @param {string}: password_confirmation
 * @return {content} content object represents the { message, auth_token }
 */
export const API_RESET_PWD = `/user/reset_password`;

/**
 * @method: PUT
 * @description: Update User Profile
 * @param {string}: name
 * @param {string}: id_number
 * @param {string}: qq
 * @param {string}: wechat
 * @param {string}: birth_day
 * @return {content} content object represents the { updated }
 */
export const API_USER_PROFILE = `/user/profile`;

/**
 * @description: Get User Bank Cards
 * @return {content} content object represents the { can_add_new_card, bank_cards }
 */
export const API_GET_USER_BANK_CARDS = `/user/bank_cards`;

/**
 * @description: Get User Bank Cards
 * @return {content} content object represents the { can_add_new_card, bank_cards }
 */
export const API_BANK_CARD_VERIFY_CODE = card_id => `${API_ADD_BANK_CARDS}/${card_id}/resend_confirmation`;

/**
 * @method: POST
 * @description: Add New Bank Card for User
 * @param {string}: user_name
 * @param {string}: bank_account
 * @param {string}: bank_code
 * @param {string}: sub_branch
 * @param {string}: province
 * @param {string}: area
 * @return {content} content object represents the { bank_card_id, confirmation_method, debug(staging), message, need_confirmtrue }
 */
export const API_ADD_BANK_CARDS = `/user/bank_cards`;

/**
 * @method: POST
 * @description: Bank Card Confirmation
 * @param {string}: confirm_token
 * @param {integer}: card_id
 * @return {content} content object represents the { confirmed, message }
 */
export const API_BANK_CARDS_CONFIRMATION = card_id =>
  `${API_ADD_BANK_CARDS}/${card_id}/confirmation`;

/**
 * @description: List All Game Wallets
 * @return {content} content object represents the { ...gameTypes }
 */
export const API_GAME_WALLET = `/user/game_wallets`;


/**
 * @description: List one type Game Wallets
 * @param {string}: category
 * @return {content} content object represents the { ...category }
 */
export const API_SINGLE_TYPE_GAMES_WALLETS = API_GAME_WALLET;

/**
 * @description: Single Game Wallet Action
 * @param {integer}: wallet_id
 * @return {content} content object represents the { id, status, balance, message }
 */
export const API_SINGLE_GAMES_WALLETS = wallet_id => `${API_GAME_WALLET}/${wallet_id}`;

/**
 * @description: Get Main Wallet Balance
 * @return {content} content object represents the { balance }
 */
export const API_GET_MAIN_WALLET = `/user/main_wallet`;

/**
 * @description: One click to clear game wallets
 * @return {content} content object represents the { game_wallets }
 */
export const API_TRANSFER_ALL_WALLET = `/user/game_wallets/clear`;

/**
 * @description: Get Bonuses
 * @return {content} content array represents the [ ...Bonuses ]
 */
export const API_BONUSES = `/user/bonuses`;

/**
 * @description: Get Single Bonus Details
 * @param {integer}: bonus_id
 * @return {content} content object represents the {{id, name, status, apply_by, bonus_order, genre, image, apply_message, detail, start_at, end_at}}
 */
export const API_BONUSES_INFO = bonus_id => `${API_BONUSES}/${bonus_id}`;

/**
 * @method: POST
 * @description: Apply Bonus
 * @param {integer}: bonus_id
 * @return {content} content object represents the { applied }
 */
export const API_BONUSES_APPLY = bonus_id => `${API_BONUSES}/${bonus_id}/apply`;

/**
 * @description: Get Bonus Histories
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: status
 * @return {content} content object represents the { total_count, current_page, current_size, bonus_histories }
 */
export const API_GET_BONUSES_HISTORY = `/user/bonuses/histories`;

/**
 * @description: Get Game Orders
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: status
 * @param {string}: partner
 * @return {content} content object represents the { total_count, current_page, current_size, game_orders }
 */
export const API_GET_GAME_TRANSFER_RECORD = `/user/game_orders`;

/**
 * @description: Get Valid bet
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: category
 * @param {string}: partner
 * @return {content} content object represents the { total_count, current_page, current_size, valid_bet_sum, total_win_lose, valid_bets }
 */
export const API_GET_VALID_BET_HISTORY = `/user/valid_bets`;

/**
 * @description: Get Bet Histories
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: category
 * @param {string}: partner
 * @return {content} content object represents the { total_count, current_page, current_size, bet_histories }
 */
export const API_GET_BET_HISTORY = `/user/bet_histories`;

/**
 * @description: Get Full Credits of Main Wallet
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: credit_type
 * @return {content} content object represents the { total_count, current_page, current_size, credits }
 */
export const API_GET_ACCOUNT_HISTORY = `/user/main_wallet/credits`;

/**
 * @method: POST
 * @description: game wallet withdraw
 * @param {integer}: amount
 * @param {integer}: wallet_id
 */
export const API_GAME_WITHDRAW = wallet_id => `/user/game_wallets/${wallet_id}/withdraw`;

/**
 * @method: POST
 * @description: game wallet deposit
 * @param {integer}: amount
 * @param {integer}: wallet_id
 */
export const API_GAME_DEPOSIT = wallet_id => `/user/game_wallets/${wallet_id}/deposit`;

/**
 * @method: PUT
 * @description: Update User's Password
 * @param {string}: old_password
 * @param {string}: new_password
 * @param {string}: password_confirmation
 * @return {content} content object represents the { updated }
 */
export const API_CHANGE_PASSWORD = "/user/change_password";

/**
 * @description: User all notifications
 * @return {content} content object represents the { notifications }
 */
export const API_USER_NOTIFICATION = "/user/notification";

/**
 * @method: PUT
 * @description: Mark Notification as Read
 * @param {integer}: id
 * @return {content} content object represents the { id, title, content, is_read, created_at }
 */
export const API_USER_NOTIFICATION_UPDATE = id => `${API_USER_NOTIFICATION}/${id}`;

/**
 * @method: POST
 * @description: Deposit to Main Wallet
 * @param {integer}: amount
 * @param {string}: method
 * @param {string}: bank_code
 * @param {string}: device
 * @param {integer}: user_card_id
 * @param {string}: offline_data[bank_name]
 * @param {string}: offline_data[remark]
 * @param {string}: offline_data[bank_account]
 * @param {integer}: offline_data[bank_card_id]
 * @param {string}: offline_data[transfer_method]
 * @param {integer}: offline_data[exchange_rate_id]
 */
export const API_MAIN_WALLET_DEPOSIT = "/user/main_wallet/deposit";

/**
 * @description: Get Offline Deposit Bank Card List
 * @return {content} content object represents the { company_bank_cards:[ ...{ id, status, company_id, bank_name, province, area, branch, account, account_name}], transfer_methods: [ cash, remit, internet, atm] }
 */
export const API_GET_OFFLINE_DEPOSIT_INFO = `/user/main_wallet/offline_deposit_info`;

/**
 * @description: Return withdraw minimum and maximum
 * @return {content} content object represents the { min, max }
 */
export const API_GET_MAIN_WALLET_WITHDRAW_LINIT = `/user/main_wallet/withdraw_limit`;

/**
 * @method: POST
 * @description: Withdraw from Main Wallet
 * @param {integer}: amount
 * @param {integer}: user_card_id
 */
export const API_MAIN_WALLET_WITHDRAW = "/user/main_wallet/withdraw";

/**
 * @description: Get Orders In Main Wallet
 * @param {integer}: page
 * @param {integer}: per_page
 * @param {string}: start_at
 * @param {string}: end_at
 * @param {string}: time_range
 * @param {string}: status
 * @param {string}: order_type
 * @return {content} content object represents the { total_count,current_page, current_size, orders }
 */
export const API_GET_MAIN_WALLET_HISTORY = `/user/main_wallet/orders`;