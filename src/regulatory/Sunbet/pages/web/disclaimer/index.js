/* tool */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import "./index.scss";

const { unflatten } = require('flat');

const Disclaimer = props => {
  const disclaimerContent = unflatten(props.intl.messages)["disclaimerContent"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="disclaimer_page">
      <div className="disclaimer_page_container">
        <h1 className="disclaimer_title">{disclaimerContent.title}</h1>
        <p className="disclaimer_desc">{disclaimerContent.description}</p>
        <p className="disclaimer_content">{disclaimerContent.content[0]}</p>
        <p className="disclaimer_content">{disclaimerContent.content[1]}</p>
      </div>
		</div>
	);
};

export default injectIntl(Disclaimer);