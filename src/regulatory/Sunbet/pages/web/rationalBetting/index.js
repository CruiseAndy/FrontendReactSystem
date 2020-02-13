/* tool */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import "./index.scss";

const { unflatten } = require('flat');

const RationalBetting = props => {
  const rationalBettingContent = unflatten(props.intl.messages)["rationalBettingContent"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="rationalBetting_page">
      <div className="rationalBetting_page_container">
        <h1 className="rationalBetting_title">{rationalBettingContent.title}</h1>
        <p className="rationalBetting_desc">{rationalBettingContent.description}</p>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[0].title}</h3>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[0].list[0]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[0].list[1]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[0].list[2]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[0].list[3]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[0].list[4]}</p>
          <p className="rationalBetting_section_list_li">
            {rationalBettingContent.section[0].list[5]}
            <a onClick={() => window.open("https://www.gambleaware.co.uk")} target="_blank">www.gambleaware.co.uk</a>
          </p>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[1].title}</h3>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[0]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[1]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[2]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[3]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[4]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[5]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[6]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[7]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[8]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[9]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[10]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[11]}</p>
          <p className="rationalBetting_section_list_li">{rationalBettingContent.section[1].list[12]}</p>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[2].title}</h3>
          <a onClick={() => window.open("https://www.gamblersanonymous.org.uk")} target="_blank">www.gamblersanonymous.org.uk</a>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[3].title}</h3>
          <a onClick={() => window.open("https://www.gamcare.co.uk")} target="_blank">www.gamcare.co.uk</a>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[4].title}</h3>
          <a onClick={() => window.open("https://www.gamblingtherapy.org")} target="_blank">www.gamblingtherapy.org</a>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[5].title}</h3>
          <p className="rationalBetting_section_desc">{rationalBettingContent.section[5].description}</p>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[6].title}</h3>
          <p className="rationalBetting_section_desc">{rationalBettingContent.section[6].description}</p>
        </div>
        <div className="rationalBetting_section">
          <h3 className="rationalBetting_section_title">{rationalBettingContent.section[7].title}</h3>
          <p className="rationalBetting_section_desc">{rationalBettingContent.section[7].description}</p>
          <p className="rationalBetting_section_desc">
            {rationalBettingContent.section[7].list[0]}
            <a onClick={() => window.open("https://www.netnanny.com")} target="_blank">www.netnanny.com</a>
          </p>
          <p className="rationalBetting_section_desc">
            {rationalBettingContent.section[7].list[1]}
            <a onClick={() => window.open("https://www.cybersitter.com")} target="_blank">www.cybersitter.com</a>
          </p>
        </div>
      </div>
		</div>
	);
};

export default injectIntl(RationalBetting);