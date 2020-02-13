/* tool */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import "./index.scss";

const { unflatten } = require('flat');

const Privacy = props => {
  const privacyContent = unflatten(props.intl.messages)["privacyContent"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="privacy_page">
      <div className="privacy_page_container">
        <h1 className="privacy_title">{privacyContent.title}</h1>
        <p className="privacy_desc">{privacyContent.description}</p>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[0].title}</h3>
          <p className="privacy_section_desc">{privacyContent.section[0].description}</p>
          <p className="privacy_section_notice">{privacyContent.section[0].notice[0]}</p>
          <p className="privacy_section_notice">{privacyContent.section[0].notice[1]}</p>
        </div>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[1].title}</h3>
          <p className="privacy_section_notice">{privacyContent.section[1].notice[0].content}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[1].notice[0].list[0]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[1].notice[0].list[1]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[1].notice[0].list[2]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[1].notice[0].list[3]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[1].notice[0].list[4]}</p>
          <p className="privacy_section_notice">{privacyContent.section[1].notice[1].content}</p>
        </div>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[2].title}</h3>
          <p className="privacy_section_desc">{privacyContent.section[2].description}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[2].notice[0]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[2].notice[1]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[2].notice[2]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[2].notice[3]}</p>
          <p className="privacy_section_notice_li">{privacyContent.section[2].notice[4]}</p>
        </div>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[3].title}</h3>
          <p className="privacy_section_desc">{privacyContent.section[3].description}</p>
        </div>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[4].title}</h3>
          <p className="privacy_section_desc">{privacyContent.section[4].description}</p>
        </div>
        <div className="privacy_section">
          <h3 className="privacy_section_title">{privacyContent.section[5].title}</h3>
          <p className="privacy_section_desc">{privacyContent.section[5].description[0]}</p>
          <p className="privacy_section_desc">{privacyContent.section[5].description[1]}</p>
          <p className="privacy_section_desc">{privacyContent.section[5].description[2]}</p>
        </div>
      </div>
		</div>
	);
};

export default injectIntl(Privacy);