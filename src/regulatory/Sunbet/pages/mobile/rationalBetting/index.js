/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebRationalBetting from "../../web/rationalBetting";

import "./index.scss";

const MobileRationalBetting = props => {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="mobile_rationalBetting_page">
      <WebRationalBetting />
		</div>
	);
};

export default MobileRationalBetting;