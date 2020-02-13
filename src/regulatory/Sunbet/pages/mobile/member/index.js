/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebMember from "../../web/member";

import "./index.scss";

const MobileMember = props => {

	return (
		<div className="mobile_member_page">
				<WebMember addBankcardRoute={props.addBankcardRoute} />
		</div>
	);
};

export default MobileMember;