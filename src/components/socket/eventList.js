export const socketAuth = {
  command: "subscribe",
  identifier: '{"channel":"Client::CommonChannel"}'
};

const messageBasicModel = data => {
  return { command: "message", data, identifier: '{"channel":"Client::CommonChannel"}' }
}

export const checkTokenValidEvent = authToken => messageBasicModel(`{"token":"${authToken}","action":"check_user_login_status"}`);

export const mainBalance = messageBasicModel(`{"action":"main_balance"}`);

export const gameBalance = id => messageBasicModel(`{"action":"game_balance","game_wallet_id":"${id}"}`);

export const gameWalletToMainWallet = (id, amount) => messageBasicModel(`{"action":"transfer_back","game_wallet_id":"${id}","balance":${amount}}`);

export const mainWalletToGameWallet = (id, amount) => messageBasicModel(`{"action":"transfer_into","game_wallet_id":"${id}","balance":${amount}}`);