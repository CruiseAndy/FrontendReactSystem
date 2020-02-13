/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebDisclaimer from "../../web/disclaimer";

import "./index.scss";

const MobileDisclaimer = props => {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="mobile_disclaimer_page">
      <WebDisclaimer />
		</div>
	);
};

export default MobileDisclaimer;