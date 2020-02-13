/* tool */
import React, { useState, useEffect } from 'react';

/* component */
import WebNews from "../../web/news";

import "./index.scss";

const MobileNews = props => {

	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
	
	return (
		<div className="mobile_news_page">
      <WebNews />
		</div>
	);
};

export default MobileNews;