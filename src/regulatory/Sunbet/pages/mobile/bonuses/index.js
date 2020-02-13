/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

/* components */
import BonusPTN from "../../../../../pattern/mobile/bonuses/sunbet";

import "./index.scss";

const MobileBounses = props => {
	
	return (
		<div className="mobile_bonuses_page">
      <div className="bonuses_banner">
        <img src={require("../../../images/bonus-banner-m.png")} />
      </div>
      <BonusPTN />
		</div>
	);
};

export default withRouter(injectIntl(MobileBounses));