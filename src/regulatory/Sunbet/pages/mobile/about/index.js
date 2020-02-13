/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebAbout from "../../web/about";

import "./index.scss";

const MobileAbout = props => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="mobile_about_page">
      <WebAbout />
		</div>
	);
};

export default MobileAbout;