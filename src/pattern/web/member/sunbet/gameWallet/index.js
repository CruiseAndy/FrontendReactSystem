/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

/* actions */
import {
  userAllGameWallet,
  userGameTransferHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
} from "../../../../../actions";

/* socket */
import {
  socketGetMainBalance,
  socketGetGameBalance,
  socketTranferMainToGame,
  socketTranferGameToMain
} from "../../../../../components/socket";

/* component */
import InputRange from "../../../../../components/inputRange/template1";
import ReactTable from "../../../../../components/table/template1";
import BalanceFormat from "../../../../../components/balanceFormat/template_1";
import ReactMobileTable from "../../../../../components/table/template2";

import "./index.scss";

const MemberGameWallet = props => {

  let isMobile = props.history.location.pathname.split("/").includes("mobile");

  const [ historyData, setHistoryData ] = useState(null);
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ transferMode, setTransferMode ] = useState("into");
  const [ transferAmount, setTransferAmount ] = useState(0);
  const [ singleGameInfo, setSingleGameInfo ] = useState(null);
  const [ rangeLimit, setRangeLimit ] = useState(null);
  const [ transferStatus, setTransferStatus ] = useState(true);

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
      key: "transfer_type"
    },
    {
      title: props.intl.formatMessage({id: "wallet.transferAmount"}),
      key: "amount"
    }
  ];

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    setTransferAmount(props.userWalletBalance);
    changeTransferMode(transferMode);
	}, [props.userWalletBalance]);

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    props.userAllGameWallet(props.intl, props.userLoginRlt.auth_token);
    socketGetMainBalance();

    setPageIndex(1);
    getHistoryData(pageIndex);
	}, [props.userLoginRlt]);

	useEffect(() => {
    if (!props.userAllGameWalletRlt)
      return;

    Object.values(props.userAllGameWalletRlt).map(item => {
      setSingleGameInfo(item);
      socketGetGameBalance(item.id);
      setTransferStatus(item.status);
    });

    getHistoryData();
	}, [props.userAllGameWalletRlt]);

	useEffect(() => {
    if (!singleGameInfo)
      return;
    
    setTimeout(() => changeTransferMode(transferMode), 1000);
  }, [singleGameInfo]);

	useEffect(() => {
    if (!props.userLoginRlt)
      return;

    getHistoryData(pageIndex);
  }, [pageIndex]);

  const changeTransferMode = (mode = "into") => {
    if (mode == "into") {
      setTransferMode("into");
      setTransferAmount(props.userWalletBalance);
      setRangeLimit({
        min: 0,
        max: props.userWalletBalance
      });
    }
    else {
      setTransferMode("out");

      if (typeof(singleGameInfo.balance) == "string") {
        setTransferAmount(parseInt(singleGameInfo.balance.split(".")[0]));

        setRangeLimit({
          min: 0,
          max: parseInt(singleGameInfo.balance.split(".")[0])
        });
      }
      else {
        setTransferAmount(singleGameInfo.balance);

        setRangeLimit({
          min: 0,
          max: singleGameInfo.balance
        });
      }
    }
  }
  
  const getHistoryData = index => {

    let apiParams = {
      page: index,
      per_page: 10
    };

    props.userGameTransferHistory(props.intl, props.userLoginRlt.auth_token, apiParams)
    .then(res => {
      setTotalAmount(res.total_count);
      let tmpData = res.game_orders;

      tmpData.map((item, index) => {
        item.status == "processing" && (tmpData[index].status = props.intl.formatMessage({id: "status.processing"}));
        item.status == "fail" && (tmpData[index].status = props.intl.formatMessage({id: "status.fail"}));
        item.status == "success" && (tmpData[index].status = props.intl.formatMessage({id: "status.success"}));
      });

      setHistoryData(tmpData);
    })
    .catch(err => {
      props.setGlobalErrMsg(err.message);
    })
  };

  const transferSubmit = () => {

    if (parseInt(transferAmount) == 0)
      return;
    
    setTransferStatus("loading");

    if (transferMode == "into") {
      socketTranferMainToGame(singleGameInfo.id, transferAmount);
    }
    else if (transferMode == "out") {
      socketTranferGameToMain(singleGameInfo.id, transferAmount);
    }
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
		<div className="member_game_wallet_page">
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "wallet.gameWallet"})}</span>
      </div>
      {
        isMobile &&
        <div className="main_balance_box">
          <span className="main_balance_title_txt">{props.intl.formatMessage({id: "wallet.mainBalance"})}</span>
          <span className="main_balance_txt">
            <BalanceFormat prefix="$" balance={props.userWalletBalance} />
          </span>
        </div>
      }
      <div className="game_wallet_container">
        <div className="transfer_mode_box">
          <div className="transfer_mode" onClick={() => changeTransferMode("into")}>
            <button className={transferMode == "into" ? "transfer_mode_btn active_into" : "transfer_mode_btn"}>
              {props.intl.formatMessage({id: "wallet.transferToGame"})}
            </button>
            { transferMode == "into" && <div className="transfer_triangle into"/> }
          </div>
          <div className="transfer_mode" onClick={() => changeTransferMode("out")}>
            <button className={transferMode == "out" ? "transfer_mode_btn active_out" : "transfer_mode_btn"}>
              {props.intl.formatMessage({id: "wallet.transferToMain"})}
            </button>
            { transferMode == "out" && <div className="transfer_triangle out"/> }
          </div>
        </div>
        <div className="transfer_amount_box">
          <div className="game_wallet_balance">
            <span className="wallet_title">{props.intl.formatMessage({id: "wallet.gameBalance"})}</span>
            <span className="wallet_balance">
            {
              singleGameInfo &&
              <BalanceFormat prefix="" balance={singleGameInfo.balance} />
            }
            </span>
          </div>
          <div className="transfer_amount">
            <div className="dialog_deal_adjust_box">
              <InputRange
                value={transferAmount}
                min={rangeLimit ? rangeLimit.min : 0}
                max={rangeLimit ? rangeLimit.max : 10000}
                step={1}
                onChange={val => setTransferAmount(val)}
              />
            </div>
            {
              transferStatus == "loading"
              ? <ClipLoader
                  css={css`border-width: 5px;`}
                  sizeUnit={"px"}
                  size={30}
                  color={props.loadingColor}
                  loading={true}
                />
              : <button className="transfer_submit" onClick={() => transferSubmit()}>
                {
                  transferMode == "into"
                  ? props.intl.formatMessage({id: "wallet.transferInto"})
                  : props.intl.formatMessage({id: "wallet.transferOut"})
                }
                </button>
            }
          </div>
        </div>
      </div>
      <div className="hr" />
			<div className="info_title_box">
        <span className="info_title">{props.intl.formatMessage({id: "transferHistory"})}</span>
      </div>
      <div className="table_container">
        { historyData && tableLayout() }
      </div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData, UserWalletData, UserGameData }) => {
  const { userLoginRlt } = UserAuthData;
  const { userWalletBalance } = UserWalletData;
  const { userAllGameWalletRlt } = UserGameData;
	return { userLoginRlt, userWalletBalance, userAllGameWalletRlt };
};

export default connect(mapStateToProps, {
  userAllGameWallet,
  userGameTransferHistory,
  setGlobalErrMsg,
  setGlobalInfoMsg,
  setGlobalSpinner
})(withRouter(injectIntl(MemberGameWallet)));