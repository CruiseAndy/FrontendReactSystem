import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* component */
import CommmunityBonuses from "./CommunityBonuses";
import CommmunityGames from "./CommunityGames";
import CommmunityPayments from "./CommunityPayments";
import CommmunityPublic from "./CommunityPublic";
import UserAuth from "./UserAuth";
import UserBankCards from "./UserBankCard";
import UserBonuses from "./UserBonuses";
import UserBet from "./UserBet";
import UserConfirmation from "./UserConfirmation";
import UserContact from "./UserContact";
import UserGame from "./UserGame";
import UserWallet from "./UserWallet";
import UserNotification from "./UserNotification";
import UserProfile from "./UserProfile";
import UserValidBet from "./UserValidBet";

/* actions */
import {
  userLogin
} from "../../../actions";

import "./index.scss"

const APIPage = props => {

  const [ apiResult, setApiResult ] = useState("");
  const [ groupIndex, setGroupIndex ] = useState(0);
  
  // useEffect(() => {
    
  //   props.userLogin("kevin", "1234")
  // },[props.loginRlt])

  const setRltData = data => {
    if (typeof(data) == "string") {
      if (data == "")
        setApiResult("null string");
      else
        setApiResult(data);
    }
    else
      setApiResult(JSON.stringify(data, undefined, 4));
  }

  const navList = [
    {
      groupName: "Community Bonuses",
      layout: <CommmunityBonuses returnResult={setRltData} />
    },
    {
      groupName: "Commmunity Games",
      layout: <CommmunityGames returnResult={setRltData} />
    },
    {
      groupName: "Commmunity Payments",
      layout: <CommmunityPayments returnResult={setRltData} />
    },
    {
      groupName: "Commmunity Public",
      layout: <CommmunityPublic returnResult={setRltData} />
    },
    {
      groupName: "User Auth",
      layout: <UserAuth returnResult={setRltData} />
    },
    {
      groupName: "User Bank-Cards",
      layout: <UserBankCards returnResult={setRltData} />
    },
    {
      groupName: "User Bet Bonuses",
      layout: <UserBonuses returnResult={setRltData} />
    },
    {
      groupName: "User Bet Histories",
      layout: <UserBet returnResult={setRltData} />
    },
    {
      groupName: "User Confirmation",
      layout: <UserConfirmation returnResult={setRltData} />
    },
    {
      groupName: "User Contact Info",
      layout: <UserContact returnResult={setRltData} />
    },
    {
      groupName: "User Game Wallets",
      layout: <UserGame returnResult={setRltData} />
    },
    {
      groupName: "User Main Wallet",
      layout: <UserWallet returnResult={setRltData} />
    },
    {
      groupName: "User Notifications",
      layout: <UserNotification returnResult={setRltData} />
    },
    {
      groupName: "User Profile",
      layout: <UserProfile returnResult={setRltData} />
    },
    {
      groupName: "User Valid Bets",
      layout: <UserValidBet returnResult={setRltData} />
    }
  ];

  return (
    <div className="APIPage">
      <div className="api_navbar">
      {
        navList.map((item, index) => {
          return (
            <div key={index}
              className={ index == groupIndex ? "nav_link focus" : "nav_link"}
              onClick={() => setGroupIndex(index)}
            >{item.groupName}</div>
          );
        })
      }
      </div>
      <div className="api_container">
        { navList.map((item, index) => index == groupIndex && <React.Fragment key={index}>{item.layout}</React.Fragment>) }
        <div className="api_result_area">
          <textarea className="txt_result" readOnly cols="30" rows="10" value={apiResult} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {
  userLogin
})(APIPage);