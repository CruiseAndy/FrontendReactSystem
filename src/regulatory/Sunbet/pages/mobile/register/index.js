/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebRegister from "../../web/register";

import "./index.scss";

const MobileRegister = props => {

	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
	
	return (
		<div className="mobile_register_page">
      <WebRegister />
		</div>
	);
};

export default MobileRegister;