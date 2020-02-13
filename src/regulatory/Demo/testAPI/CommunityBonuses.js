import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityBonuses,
  // getCommunityBonusesDetail
} from "../../../actions";

/* component */
import CompInput from "./component/input";

import "./index.scss"

const CommunityBonuses = props => {

  const [ bonusesId, setBonusesId ] = useState("");

  const getCommunityBonuses = () => {
    props.getCommunityBonuses(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  }

  // const getCommunityBonusesDetail = () => {
  //   if (bonusesId == "")
  //     return;

  //   props.getCommunityBonusesDetail(bonusesId)
  //   .then(res => {
  //     props.returnResult(res);
  //   })
  //   .catch(err => {
  //     props.returnResult(err);
  //   })
  // }

  const setID = id => setBonusesId(id);

  return (
    <div className="api_btn_panel">
      <button onClick={() => getCommunityBonuses()} className="btn btn-primary btn-lg">Get Community Bonuses</button>
      {/* <button onClick={() => getCommunityBonusesDetail()} className="btn btn-primary btn-lg">Get Community Bonuses Detail</button> */}
      <CompInput title="ID" onChange={setID} />
    </div>
  );
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {
  getCommunityBonuses,
  // getCommunityBonusesDetail
})(CommunityBonuses);