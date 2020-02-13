/* tools */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* actions */
import {
  saveMainWalletBalance,
  saveGameWalletBalance,
  userAllGameWallet
} from "../../actions";

import { apiURL } from "../../actions/axiosIns";

/* event lsit */
import {
  socketAuth,
  checkTokenValidEvent,
  mainBalance,
  gameBalance,
  gameWalletToMainWallet,
  mainWalletToGameWallet
} from "./eventList";

global.reactSocket = null;

let socketTimeout = null;

export const socketGetMainBalance = () => {
  setTimeout(() => global.reactSocket.send(JSON.stringify(mainBalance)), 1000);
}

export const socketGetGameBalance = id => {
  setTimeout(() => global.reactSocket.send(JSON.stringify(gameBalance(id))), 1000);
}

export const socketTranferGameToMain = (id, amount) => {
  setTimeout(() => {
    global.reactSocket.send(JSON.stringify(gameWalletToMainWallet(id, amount)));
  }, 1000);
}

export const socketTranferMainToGame = (id, amount) => {
  setTimeout(() => {
    global.reactSocket.send(JSON.stringify(mainWalletToGameWallet(id, amount)));
  }, 1000);
}

export const closeSocket = () => {
  if (global.reactSocket) {
    global.reactSocket.close();
  }
};

const Socket = props => {

  const [ socketConnect, setSocketConnect ] = useState(false);
  const [ socketToken, setSocketToken ] = useState(null);

  const checkTokenValid = () => {

    global.reactSocket.send(JSON.stringify(checkTokenValidEvent(socketToken)));
  
    socketTimeout = setTimeout(() => checkTokenValid(socketToken), 30000);
  }

  const openSocket = () => {
    const socketDomains = apiURL.split("/")[2];
    const socketUrl = () => `wss://${socketDomains}/cable?token=${socketToken}&resource=api`;

    global.reactSocket = new WebSocket(socketUrl(socketToken));
  
    global.reactSocket.onopen = () => {
      global.reactSocket.send(JSON.stringify(socketAuth));
      socketReciveMsg();
      checkTokenValid(socketToken);
    }
  };
  
  const socketReciveMsg = () => {
    global.reactSocket.onmessage = function (event) {
      let socketRes = JSON.parse(event.data);

      socketRes.type != "ping" && console.log(socketRes);

      if (socketRes.message) {
        switch(socketRes.message.event) {
          case "refreshPage":
            if (socketRes.message.token == socketToken) {
              props.history.push("/");
              location.reload();
            }
            break;
          case "updateMainBalance":
            props.saveMainWalletBalance(socketRes.message.balance);
            props.userAllGameWallet(null, props.userLoginRlt.auth_token);
            break;
          case "updateGameBalance":
            props.saveGameWalletBalance(socketRes.message.game_wallet_id, socketRes.message.balance);
            break;
          case "transferDone":
            socketGetMainBalance();
            socketGetGameBalance(socketRes.message.game_wallet_id);
            break;
          default:
            break;
        }
      }
    }
  };

  useEffect(() => {
    if (props.userLoginRlt) {
      setSocketToken(props.userLoginRlt.auth_token);
    }
    else {
      setSocketToken(null);
    }
	}, [props.userLoginRlt]);

  useEffect(() => {
    
    if (!socketConnect && socketToken) {
      setSocketConnect(true);
      openSocket()
    }
    else if (!socketToken) {
      closeSocket();
      setSocketConnect(false);
      socketTimeout && clearTimeout(socketTimeout);
    }
    
    return () => {
			closeSocket();
      socketTimeout && clearTimeout(socketTimeout);
    }
	}, [socketToken]);

  return (
    <div style={{ width: "1px", height: "1px", opacity: 0, position: "absolute" }}></div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  saveMainWalletBalance,
  saveGameWalletBalance,
  userAllGameWallet
})(withRouter(Socket));