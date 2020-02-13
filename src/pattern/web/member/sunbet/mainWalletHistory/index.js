/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
  userWalletTransferHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* component */
import ReactTable from "../../../../../components/table/template1";
import ReactMobileTable from "../../../../../components/table/template2";

import "./index.scss";

const MemberMainWalletHistory = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const dataStructure = [
    {
      title: props.intl.formatMessage({id: "history.time"}),
      key: "created_at"
    },
    {
      title: props.intl.formatMessage({id: "history.serialNum"}),
      key: "order_num"
    },
    {
      title: props.intl.formatMessage({id: "history.status"}),
      key: "status"
    },
    {
      title: props.intl.formatMessage({id: "history.transferType"}),
      key: "type"
    },
    {
      title: props.intl.formatMessage({id: "history.amount"}),
      key: "amount"
    }
  ];

  const [ historyData, setHistoryData ] = useState(null);
  const [ pageIndex, setPageIndex ] = useState(0);
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
      per_page: 20
    };

    props.userWalletTransferHistory(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      setTotalAmount(res.total_count);
      let tmpData = res.orders;

      tmpData.map((item, index) => {
        item.status == "processing" && (tmpData[index].status = props.intl.formatMessage({id: "status.processing"}));
        item.status == "fail" && (tmpData[index].status = props.intl.formatMessage({id: "status.fail"}));
        item.status == "success" && (tmpData[index].status = props.intl.formatMessage({id: "status.success"}));
        item.type == "deposit" && (tmpData[index].type = props.intl.formatMessage({id: "wallet.deposit"}));
        item.type == "draw" && (tmpData[index].type = props.intl.formatMessage({id: "wallet.withdraw"}));
      });

      props.setGlobalSpinner(false);
      setHistoryData(tmpData);
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
          perPageAmount={20}
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
          perPageAmount={20}
          onChangePage={index => setPageIndex(index)}
        />
      );
    }
  }
  
	return (
		<div className="member_main_wallet_history_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "memberMenu.mainOrders"})}</span>
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
  userWalletTransferHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberMainWalletHistory)));