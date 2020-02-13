/* tool */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

/* component */
import InputRange from "../../../../../components/inputRange/template1";

import "./index.scss";

const DealDialog = props => {

  const [ depositAmount, setDepositAmount ] = useState(0);

	useEffect(() => {
    if (!props.depositInfo)
      return;

    setDepositAmount(props.depositInfo.min);
  }, [props.depositInfo]);

	return (
		<div className="deal_dialog_container">
      <div className="dialog_box">
        <div className="dialog_close_box">
          <span className="icon-error icon_close" onClick={() => props.closeDialog()} />
        </div>
        <div className="dialog_title_box">
          <span className="dialog_title">{props.depositInfo.name}</span>
        </div>
        <div className="hr"/>
        <div className="dialog_deal_range_box">
          <span className="deal_range_title">{props.intl.formatMessage({id: "deposit.singleAmount"})}</span>
          <span className="deal_range_txt">{`${props.depositInfo.min}-${props.depositInfo.max}`}</span>
        </div>
        <div className="dialog_deal_adjust_box">
          <InputRange
            value={depositAmount}
            min={parseInt(props.depositInfo.min)}
            max={parseInt(props.depositInfo.max.split(",").join(""))}
            step={props.depositInfo.step}
            onChange={val => setDepositAmount(val)}
          />
        </div>
        <div className="dialog_next_step_box">
          <button
            className="dialog_next_step_btn"
            onClick={() => props.onSubmit(props.depositInfo.type, depositAmount)}
          >
            {props.intl.formatMessage({id: "next"})}
          </button>
        </div>
      </div>
		</div>
	);
};

export default injectIntl(DealDialog);