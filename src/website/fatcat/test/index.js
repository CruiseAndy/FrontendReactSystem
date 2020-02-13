/* tools */
import React, { Component, useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/* css */
import './index.scss';

/* component */
import Header from '../header';

// function counterReducer(state, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return { counter: state.counter + 1 };
//     default:
//       return { counter: 0 };
//   }
// }

const Test = props => {
	// const [ counter, setCounter ] = useState(0);
	// const [state, dispatch] = useReducer(counterReducer, { counter: 10 });

	// useEffect(() => {
  //   setCounter(counter => 10);
  //   return () => {
  //     setCounter(counter => 0);
  //   };
	// }, []);
	
	return (
		<div>
			<h1 onClick={() => dispatch({ type: "INCREMENT" })}>
			{/* <h1 onClick={ () => setCounter(counter => counter + 1) }> */}
				hello, kevin {props.Step0Data.countRlt} times
			</h1>
		</div>
	);
}

const mapStateToProps = ({ Step0Data }) => {
	return { Step0Data };
};

// class Home extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<div className="container Common-Container">
// 					<div className="Common-TitleBox">
// 						<h2>免費開戶</h2>
// 						<p style={{ fontSize: "25px" }}>鉅亨買基金「好、省、超、優」!</p>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default connect(mapStateToProps, {  })(Test);