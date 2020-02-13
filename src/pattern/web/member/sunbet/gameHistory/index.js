/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userBetHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */
import ReactTable from "../../../../../components/table/template1";
import ReactMobileTable from "../../../../../components/table/template2";

import "./index.scss";

const MemberGameTransferHistory = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const dataStructure = [
    {
      title: props.intl.formatMessage({id: "history.time"}),
      key: "bet_time"
    },
    {
      title: props.intl.formatMessage({id: "history.gameKind"}),
      key: "partner"
    },
    {
      title: props.intl.formatMessage({id: "history.kind"}),
      key: "settled_status"
    },
    {
      title: props.intl.formatMessage({id: "history.betsAmount"}),
      key: "bet_amount"
    },
    {
      title: props.intl.formatMessage({id: "history.winLost"}),
      key: "win_lose"
    },
    {
      title: props.intl.formatMessage({id: "history.result"}),
      key: "detail",
      img: props.searchImg,
      detailTitle: props.intl.formatMessage({id: "history.detail"}),
      detailSubTitle: [
        props.intl.formatMessage({id: "history.time"}),
        props.intl.formatMessage({id: "history.gameKind"}),
        props.intl.formatMessage({id: "history.kind"}),
        props.intl.formatMessage({id: "history.betsAmount"}),
        props.intl.formatMessage({id: "history.winLost"})
      ],
      detailInfoKey: [ "bet_time", "partner", "settled_status", "bet_amount", "win_lose" ],
      detailResult: {
        title: props.intl.formatMessage({id: "history.result"}),
        valKey: "result"
      }
    }
  ];

  const [ historyData, setHistoryData ] = useState(null);
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ totalAmount, setTotalAmount ] = useState(0);

	useEffect(() => {
    if (!props.userLoginRlt)
      return;
    
    setPageIndex(1);
	}, [props.userLoginRlt]);

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    getHistoryData(pageIndex);
  }, [pageIndex]);
  
  const getHistoryData = index => {

    props.setGlobalSpinner(true);

    let apiParams = {
      page: index,
      per_page: 10
    };

    props.userBetHistory(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      setTotalAmount(res.total_count);

      props.setGlobalSpinner(false);
      setHistoryData(res.bet_histories);
    })
    .catch(err => {
      props.setGlobalSpinner(false);
      props.setGlobalErrMsg(err.message);
    })
  }

  const tableLayout = () => {
    if (isMobile) {
      return (
        <ReactMobileTable
          data={historyData}
          structure={dataStructure}
          noData={props.intl.formatMessage({id: "noData"})}
          totalAmount={totalAmount}
          nowPage={pageIndex}
          perPageAmount={10}
          onChangePage={index => setPageIndex(index)}
        />
      );
    }
    else {
      return (
        <ReactTable
          data={historyData}
          structure={dataStructure}
          noData={props.intl.formatMessage({id: "noData"})}
          totalAmount={totalAmount}
          nowPage={pageIndex}
          perPageAmount={10}
          onChangePage={index => setPageIndex(index)}
        />
      );
    }
  }
  
	return (
		<div className="member_game_history_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "memberMenu.gameOrder"})}</span>
      </div>
      <div className="table_container">
        { historyData && tableLayout() }
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
  userBetHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberGameTransferHistory)));