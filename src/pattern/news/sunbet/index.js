/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import TextLoop from "react-text-loop";

/* actions */
import {
  getCommunityNews
} from "../../../actions";

import "./index.scss";

const News = props => {

  const [ newsInfo, setNewsInfo ] = useState(null);

	useEffect(() => {
    props.getCommunityNews(props.intl)
    .then(res => {
      if (res.length != 0) {
        setNewsInfo(res);
      }
    });
  }, []);
  
  const newsAnimation1 = () => {
    return (
      <TextLoop interval={3000} noWrap={false} mask={true}>
      {
        newsInfo.map((item, index) => {
          const { title, content } = item;

          return (
            <div key={index}>
              <div className="news_title">
                <span>{title}</span>
              </div>
              <div className="news_content">
                <span>{content}</span>
              </div>
            </div>
          );
        })
      }
      </TextLoop>
    );
  }

  return (
    <div className="news_pattern">
      <div className="news_container">
        <div className="news_header_box">
          <div className="news_paper_box">
            <div className="news_paper">
              <img src={require("./images/newspaper.svg")} />
            </div>
          </div>
          <span className="company_title">{`${props.company} ${props.intl.formatMessage({id: "news"})}`}</span>
          <button className="all_button" onClick={() => {
              props.device == "mobile"
              ? props.history.push("/mobile/news")
              : props.history.push("/news");
            }}>
            {props.intl.formatMessage({id: "all"})}
          </button>
        </div>
        <div className="news_hr" />
        <div className="news_content_box">
        {
          newsInfo
          ? newsAnimation1()
          : null
        }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps, {
  getCommunityNews
})(withRouter(injectIntl(News)));