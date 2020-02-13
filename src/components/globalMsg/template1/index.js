/* tools */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

/* actions */
import {
  clearGlobalErrMsg,
  clearGlobalInfoMsg,
  clearGlobalConfirmMsg
} from "../../../actions";

/* css */
import './index.scss';

const GlobalMsg = props => {

  const [ showGlobalMsg, setShowGlobalMsg ] = useState(false);
  const [ showErrMsg, setShowErrMsg ] = useState(false);
  const [ showInfoMsg, setShowInfoMsg ] = useState(false);
  

	useEffect(() => {
    props.errMsgRlt == null && props.infoMsgRlt == null && props.confirmMsgRlt == null
      ? setShowGlobalMsg(false)
      : setShowGlobalMsg(true);
    
    return () => {}
  }, [props.errMsgRlt, props.infoMsgRlt, props.confirmMsgRlt]);

  /**
   * error control
   */
	useEffect(() => {
    
    props.errMsgRlt == null
    ? setShowErrMsg(false)
    : props.errMsgRlt.code == 1000
      ? location.reload()
      : setShowErrMsg(true);
    
    return () => {}
  }, [props.errMsgRlt]);

  const errorLayout = () => {
    return (
      <div className="error_msg_box">
        <span className="icon-error msg_icon" />
        <span className="msg_txt">{props.errMsgRlt}</span>
      </div>
    );
  }

  /**
   * infomation control
   */
	useEffect(() => {
    props.infoMsgRlt == null ? setShowInfoMsg(false) : setShowInfoMsg(true);
    
    return () => {}
  }, [props.infoMsgRlt]);

  const infoLayout = () => {
    return (
      <div className="info_msg_box">
        <span className="icon-success msg_icon" />
        <span className="msg_txt">{props.infoMsgRlt}</span>
      </div>
    );
  }

	return (
    <React.Fragment>
    {
      showGlobalMsg &&
      <div
        className="global_msg_component"
        style={{ backgroundColor: props.BGColor }}
        onClick={() => {
          showErrMsg && props.clearGlobalErrMsg();
          showInfoMsg && props.clearGlobalInfoMsg();
        }}
      >
        <div className="msg_box">
          { showErrMsg && errorLayout() }
          { showInfoMsg && infoLayout() }
        </div>
      </div>
    }
    </React.Fragment>
	);
}

const mapStateToProps = ({ GlobalMsgData }) => {
  const { errMsgRlt, infoMsgRlt, confirmMsgRlt } = GlobalMsgData;
	return { errMsgRlt, infoMsgRlt, confirmMsgRlt };
};

export default connect(mapStateToProps, {
  clearGlobalErrMsg,
  clearGlobalInfoMsg,
  clearGlobalConfirmMsg
})(withRouter(injectIntl(GlobalMsg)));