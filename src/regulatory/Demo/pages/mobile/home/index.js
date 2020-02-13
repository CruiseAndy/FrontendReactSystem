/* tool */
import React, { useState, useEffect } from 'react';

/* components */
import WebHome from "../../web/home";

import "./index.scss";

const MobileHome = props => {
	return (
		<div className="mobile_home_page">
      <WebHome device={props.device} />
		</div>
	);
};

export default MobileHome;