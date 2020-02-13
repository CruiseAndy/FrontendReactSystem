import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* actions */
import {
  getCommunityFAQ,
  getCommunityNews,
  getCommunityAppCarousel,
  getCommunityCarousel,
  getCommunityPreload
} from "../../../actions";

import "./index.scss"

const CommunityPublic = props => {

  const getCommunityFAQ = () => {
    props.getCommunityFAQ(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityNews = () => {
    props.getCommunityNews(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityAppCarousel = () => {
    props.getCommunityAppCarousel(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityCarousel = () => {
    props.getCommunityCarousel(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  const getCommunityPreload = () => {
    props.getCommunityPreload(null)
    .then(res => {
      props.returnResult(res);
    })
    .catch(err => {
      props.returnResult(err);
    })
  };

  return (
    <div className="api_btn_panel">
      <button onClick={() => getCommunityFAQ()} className="btn btn-primary btn-lg">Get Community FAQ</button>
      <button onClick={() => getCommunityNews()} className="btn btn-primary btn-lg">Get Community News</button>
      <button onClick={() => getCommunityAppCarousel()} className="btn btn-primary btn-lg">Get Community App Carousel</button>
      <button onClick={() => getCommunityCarousel()} className="btn btn-primary btn-lg">Get Community Carousel</button>
      <button onClick={() => getCommunityPreload()} className="btn btn-primary btn-lg">Get Community Preload</button>
    </div>
  );
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {
  getCommunityFAQ,
  getCommunityNews,
  getCommunityAppCarousel,
  getCommunityCarousel,
  getCommunityPreload
})(CommunityPublic);