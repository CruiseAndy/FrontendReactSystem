/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userNotification,
  changeNotificationStatus,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */
import ReactTable from "../../../../../components/table/template1";
import ReactMobileTable from "../../../../../components/table/template2";

import "./index.scss";

const MemberNotification = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const [ notificationList, setNotificationList ] = useState(null);
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ unreadAmount, setUnreadAmount ] = useState(0);

  const dataStructure = [
    {
      title: "",
      key: "is_read"
    },
    {
      title: props.intl.formatMessage({id: "history.time"}),
      key: "created_at"
    },
    {
      title: props.intl.formatMessage({id: "caption"}),
      key: "title"
    },
    {
      title: props.intl.formatMessage({id: "operating"}),
      key: "notificationContent",
      img: props.searchImg,
      detailInfoKey: [ "content" ]
    }
  ];

	useEffect(() => {
    if (!props.userLoginRlt)
      return;
    
    getNotificationData();
	}, [props.userLoginRlt]);
  
  const getNotificationData = () => {

    props.userNotification(props.intl, props.userLoginRlt.auth_token)
    .then(res => {
      setTotalAmount(res.notifications.length);
      setNotificationList(res.notifications);

      let countAmount = 0;

      res.notifications.map(item => !item.is_read && countAmount++);

      setUnreadAmount(countAmount);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    })
  }

  const tableLayout = () => {
    if (isMobile) {
      return (
        <ReactMobileTable
          data={notificationList}
          structure={dataStructure}
          noData={props.intl.formatMessage({id: "noData"})}
          unRead={props.intl.formatMessage({id: "notification.unread"})}
          totalAmount={totalAmount}
          nowPage={pageIndex}
          perPageAmount={10}
          onChangePage={index => setPageIndex(index)}
          onChangeStatus={id => {
            props.changeNotificationStatus(props.intl, props.userLoginRlt.auth_token, id)
            .then(res => {
              getNotificationData();
            })
          }}
        />
      );
    }
    else {
      return (
        <ReactTable
          data={notificationList}
          structure={dataStructure}
          noData={props.intl.formatMessage({id: "noData"})}
          unRead={props.intl.formatMessage({id: "notification.unread"})}
          totalAmount={totalAmount}
          nowPage={pageIndex}
          perPageAmount={10}
          onChangePage={index => setPageIndex(index)}
          onChangeStatus={id => {
            props.changeNotificationStatus(props.intl, props.userLoginRlt.auth_token, id)
            .then(res => {
              getNotificationData();
            })
          }}
        />
      );
    }
  }
  
	return (
		<div className="member_notification_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "memberMenu.message"})}</span>
      </div>
      <div className="notification_unread_num_box">
        <span>{`${props.intl.formatMessage({id: "unread"})} ${unreadAmount}`}</span>
      </div>
      <div className="table_container">
        { notificationList && tableLayout() }
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userNotification,
  changeNotificationStatus,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberNotification)));