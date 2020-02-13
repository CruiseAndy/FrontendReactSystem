/* tools */
import React, { Component, useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* actions */
import { CALL_API_SUCCESS } from "../../actions/types";
import { countNum, callApi } from "../../actions";

/* css */
import './index.scss';

/* component */
import Header from '../header';

const Home = props => {
  const { callApi } = props;
	const [ counter, setCounter ] = useState(10);
	
	return (
		<div>
			{/* <h1 onClick={() => props.countNum()}>
				hello, kevin {props.Step0Data.countRlt} props times
			</h1> */}
			<h1 onClick={() => setCounter(counter => counter + 1)}>
				hello, kevin {counter} state times
			</h1>
			{/* <h1 onClick={callApi}>
				hello, kevin {counter} dispatch times
			</h1> */}
			<h1 onClick={() => props.callApi()}>
				hello, kevin call api
			</h1>
			<Link to="/test">
				<h1>Go Test!</h1>
			</Link>
		</div>
	);
}

const mapStateToProps = ({ Step0Data }) => {
	return { Step0Data };
};

export default connect(mapStateToProps, { countNum, callApi })(Home);