import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  userBonusesHistroy,
  userBonusesList,
  userBonusesApply,
  // userBonusesDetail
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const UserBankCard = props => {

  const [ userBonusesId, setUserBonusesId ] = useState("");

  const userBonusesHistroy = () => {
    const apiParams = {
			page: 1,
			per_page: 20
    };

    props.userBonusesHistroy(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userBonusesList = () => {
    props.userBonusesList(props.userLoginRlt.auth_token)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const userBonusesApply = () => {
    props.userBonusesApply(props.userLoginRlt.auth_token, userBonusesId)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  // const userBonusesDetail = () => {
  //   props.userBonusesDetail(props.userLoginRlt.auth_token, userBonusesId)
  //   .then(res => {
  //     props.returnResult(res);
  //   })
  //   .catch(err => {
  //     props.returnResult(err);
  //   })
  // };

  const setBonusesId = id => setUserBonusesId(id);

  return (
    <div className="api_btn_panel">
      <button onClick={() => userBonusesHistroy()} className="btn btn-primary btn-lg">User Bonuses Histoty</button>
      <button onClick={() => userBonusesList()} className="btn btn-primary btn-lg">User Bonuses List</button>
      <button onClick={() => userBonusesApply()} className="btn btn-primary btn-lg">User Bonuses Apply</button>
      {/* <button onClick={() => userBonusesDetail()} className="btn btn-primary btn-lg">User Bonuses Detail</button> */}
      <CompInput title="Bonuses ID" onChange={setBonusesId} />
    </div>
  );
}

const mapStateToProps = ({ UserAuthData }) => {
  const { userLoginRlt } = UserAuthData;
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userBonusesHistroy,
  userBonusesList,
  userBonusesApply,
  // userBonusesDetail
})(UserBankCard);