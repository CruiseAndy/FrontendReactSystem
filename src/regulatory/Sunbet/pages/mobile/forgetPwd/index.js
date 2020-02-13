/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebForgetPwd from "../../web/forgetPwd";

import "./index.scss";

const MobileForgetPwd = props => {

	useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);
	
	return (
		<div className="mobile_forgetPwd_page">
      <WebForgetPwd />
		</div>
	);
};

export default MobileForgetPwd;