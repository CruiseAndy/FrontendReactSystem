/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  setLocales
} from "../../../../actions";

import "./index.scss";

const Footer = props => {

  return (
    <div className="footer_pattern">
      <div className="footer_container">
        <div className="footer_link_section">
          {/* about company */}
          <div className="footer_link_box">
            <div className="company_related_box">
              <div className="company_logo">
                <img className="logo_img" src={props.logoImg} />
              </div>
              <div className="company_desc">
                <p className="title">{props.companyTitle}</p>
                <p className="description">{props.companyDesc}</p>
              </div>
            </div>
            <div className="adobe_flash">
              <img className="flash_img" src={props.flashImg} />
            </div>
          </div>
          {/* more link */}
          <div className="footer_link_box">
            <div className="more_link_box">
              <p className="more_link_title">{props.intl.formatMessage({id: "moreLink"})}</p>
              {
                props.moreLink.map((item, index) => {
                  const { title, route } = item;

                  return <p key={index} className="more_link" onClick={() => props.history.push(route)}>{title}</p>
                })
              }
            </div>
          </div>
          {/* language setting */}
          <div className="footer_link_box">
            <div className="language_box">
              <p className="language_title">{props.intl.formatMessage({id: "language.title"})}</p>
              {
                props.language.map((item, index) => {
                  const { title, langKey } = item;

                  return (
                    <div key={index} className="lang_item" onClick={() => props.setLocales(langKey)}>
                      <div className={langKey == props.localesRlt ? "lang_chk lang_chk_active" : "lang_chk"}>
                        <span className="icon-success chk_icon"/>
                      </div>
                      <span className={langKey == props.localesRlt ? "lang_txt lang_txt_active" : "lang_txt"}>{title}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className="footer_img_sction">
          <img src={props.bannerImg} />
        </div>
      </div>
      <div className="footer_footer">
        <div className="footer_footer_box">
        {
          props.footer.map((item, index) => {
            const { title, route } = item;

            return <span key={index} className="link_txt" onClick={() => props.history.push(route)}>{title}</span>
          })
        }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ LocalesData }) => {
  const { localesRlt } = LocalesData;
	return { localesRlt };
};

export default connect(mapStateToProps, {
  setLocales
})(withRouter(injectIntl(Footer)));