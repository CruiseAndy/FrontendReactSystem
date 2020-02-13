/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

/* components */
import BonusPTN from "../../../../../pattern/web/bonuses/sunbet";

import "./index.scss";

const Bounses = props => {
	
	return (
		<div className="bonuses_page">
      <div className="bonuses_banner">
        <img src={require("../../../images/bonus-banner.png")} />
      </div>
      <BonusPTN />
		</div>
	);
};

export default withRouter(injectIntl(Bounses));