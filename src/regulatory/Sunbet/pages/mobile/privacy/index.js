/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebPrivacy from "../../web/privacy";

import "./index.scss";

const MobilePrivacy = props => {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="mobile_privacy_page">
      <WebPrivacy />
		</div>
	);
};

export default MobilePrivacy;