/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  getCommunityBonuses,
  userBonusesList,
  userBonusesApply,
  setGlobalInfoMsg,
  setGlobalErrMsg,
  setGlobalSpinner
} from "../../../../actions";

import "./index.scss";
import "../defaultContent.scss";

const Bonuses = props => {

  const [ bonusesInfo, setBonusesInfo ] = useState(null);
  const [ showDetailId, setShowDetailId ] = useState(-1);

	useEffect(() => {
    getBonusesInfo();
  }, [props.userLoginRlt]);

  const getBonusesInfo = () => {
    if (props.userLoginRlt && props.userLoginRlt.user_confirmed) {
      props.userBonusesList(props.intl, props.userLoginRlt.auth_token)
      .then(res => {
        res.sort((a, b) => a.bonus_order - b.bonus_order);
        setBonusesInfo(res);
      })
      .catch(err => {
        props.setGlobalErrMsg(err.message);
      });
    }
    else {
      props.getCommunityBonuses(props.intl)
      .then(res => {
        res.sort((a, b) => a.bonus_order - b.bonus_order);
        setBonusesInfo(res)
      })
      .catch(err => {
        props.setGlobalErrMsg(err.message);
      });
    }
  };

  const showDetailCtl = id => {
    id == showDetailId ? setShowDetailId(-1) : setShowDetailId(id);
  };

  const noApplyLayout = status => {
    return (
      <div className="no_apply_box">
        <div className="icon_box">
          <span className="icon-success no_apply_icon"/>
        </div>
        <span className="no_apply_txt">
        {
          status == "auto"
          ? props.intl.formatMessage({id: "bonuses.applyState.auto"})
          : props.intl.formatMessage({id: "bonuses.applyState.applied"})
        }
        </span>
      </div>
    );
  };

  const manualApplyLayout = id => {
    return (
      <button className="manual_apply_btn" onClick={() => applyCtrl(id)}>
        {props.intl.formatMessage({id: "bonuses.applyState.manual"})}
      </button>
    );
  };

  const otherLayout = status => {
    return (
      <p className="contact_status">
      {
        status == "cs"
        ? props.intl.formatMessage({id: "bonuses.applyState.cs"})
        : props.intl.formatMessage({id: "bonuses.applyState.agent"})
      }
      </p>
    );
  };

  const applyCtrl = id => {
    if (!props.userLoginRlt) {
      props.setGlobalErrMsg(props.intl.formatMessage({id: "unLogin"}));
      return;
    }

    props.setGlobalSpinner(true);

    props.userBonusesApply(props.intl, props.userLoginRlt.auth_token, id)
    .then(res => {
      props.setGlobalSpinner(false);
      props.setGlobalInfoMsg(res.message);
      getBonusesInfo();
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  return (
    <div className="mobile_bonuses_pattern">
      <div className="bonuses_container">
      {
        bonusesInfo && bonusesInfo.length != 0 &&
        bonusesInfo.map((item, index) => {
          const { id, name, apply_by, image, start_at, end_at, content, status } = item;

          return (
            <div key={index} className="bonuses_box">
              <div className="summary_box">
                <div className="bonuses_img">
                  <img src={image} />
                </div>
              </div>
              <div className={ id == showDetailId ? "detail_box show_detail" : "detail_box"}>
                <span className="detail_title">{name}</span>
                <span className="detail_activity_time">
                {
                  status == "on"
                  ? `${props.intl.formatMessage({id: "bonuses.activeTime"})}：${props.intl.formatMessage({id: "bonuses.forever"})}`
                  : `${props.intl.formatMessage({id: "bonuses.activeTime"})}：${start_at} ~ ${end_at}`
                }
                </span>
                <div className="detail_content" dangerouslySetInnerHTML={{__html: content}}></div>
              </div>
              <div className="bonuses_status">
                <div className="detail_btn_box" onClick={() => showDetailCtl(id)}>
                  <span className="detail_btn_txt">{props.intl.formatMessage({id: "bonuses.moreBtn"})}</span>
                  <span className={ id == showDetailId ? "icon-angle-down detail_btn_icon turn" : "icon-angle-down detail_btn_icon"} />
                </div>
                {
                  apply_by == "auto" || apply_by == "applied"
                  ? noApplyLayout(apply_by)
                  : apply_by == "manual"
                    ? manualApplyLayout(id)
                    : apply_by == "cs" || apply_by == "agent"
                      ? otherLayout(apply_by)
                      : null
                }
              </div>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  getCommunityBonuses,
  userBonusesList,
  userBonusesApply,
  setGlobalInfoMsg,
  setGlobalErrMsg,
  setGlobalSpinner
})(withRouter(injectIntl(Bonuses)));