/* tools */
import React, { Component } from 'react';

/* css */
import './index.scss';

class TitleBar extends Component {
	render() {
		return (
			<div className="titleBar">
				{/* <img className="imgLogo" src={require("../../images/app-store.png")} /> */}
				<span>JVD App Store</span>
			</div>
		);
	}
}

export default TitleBar;