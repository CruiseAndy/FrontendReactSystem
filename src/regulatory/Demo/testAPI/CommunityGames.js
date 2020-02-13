import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityGames
} from "../../../actions";

import "./index.scss"

const CommunityGames = props => {

  const getCommunityGames = () => {
    props.getCommunityGames(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => getCommunityGames()} className="btn btn-primary btn-lg">Get Community Games</button>
    </div>
  );
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {
  getCommunityGames
})(CommunityGames);