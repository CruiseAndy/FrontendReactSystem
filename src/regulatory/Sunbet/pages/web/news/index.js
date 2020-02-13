/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityNews
} from "../../../../../actions";

import "./index.scss";

const News = props => {

  const [ newsInfo, setNewsInfo ] = useState(null);
  const [ focusIndex, setFocusIndex ] = useState(-1);

	useEffect(() => {
    props.getCommunityNews(props.intl)
    .then(res => {
      if (res.length != 0) {
        setNewsInfo(res);
      }
    });
  }, []);

  const newsLayout = () => {
    return (
      <React.Fragment>
      {
        newsInfo.map((item, index) => {
          const { title, content } = item;

          return (
            <div
              key={index}
              className={index == focusIndex ? "news_box focusAnimation" : "news_box"}
              onClick={() => setFocusIndex(index)}
            >
              <span className="news_title">{title}</span>
              <div className="hr"/>
              <span className="news_content">{content}</span>
            </div>
          );
        })
      }
      </React.Fragment>
    );
  }
	
	return (
		<div className="news_page">
      <div className="news_container">
      {
        newsInfo
        ? newsLayout()
        : null
      }
      </div>
		</div>
	);
};

const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps, {
  getCommunityNews
})(withRouter(injectIntl(News)));