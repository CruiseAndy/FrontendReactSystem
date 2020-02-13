/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter, useRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import "./index.scss";

const { unflatten } = require('flat');

const About = props => {
  const aboutUsContent = unflatten(props.intl.messages)["aboutUsContent"];

	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
	
	return (
		<div className="about_page">
      <div className="about_page_container">
        <h1 className="about_title">{aboutUsContent.title}</h1>
        <p className="about_desc">{aboutUsContent.description}</p>
        <div className="about_section">
          <h3 className="about_section_title">{aboutUsContent.section[0].title}</h3>
          <p className="about_section_desc">{aboutUsContent.section[0].description}</p>
        </div>
        <div className="about_section">
          <h3 className="about_section_title">{aboutUsContent.section[1].title}</h3>
          <p className="about_section_desc">{aboutUsContent.section[1].description}</p>
        </div>
        <div className="about_section">
          <h3 className="about_section_title">{aboutUsContent.section[2].title}</h3>
          <p className="about_section_desc">{aboutUsContent.section[2].description}</p>
        </div>
        <div className="about_section">
          <h3 className="about_section_title">{aboutUsContent.section[3].title}</h3>
          <p className="about_section_desc">{aboutUsContent.section[3].description}</p>
        </div>
        <div className="about_section">
          <h3 className="about_section_title">{aboutUsContent.section[4].title}</h3>
          <p className="about_section_desc">{aboutUsContent.section[4].description}</p>
        </div>
      </div>
		</div>
	);
};

export default withRouter(injectIntl(About));