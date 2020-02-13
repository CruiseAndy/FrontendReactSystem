/* tools */
import React from 'react';
import NumberFormat from 'react-number-format';

const BalanceFormat = props => {

	return (
		<NumberFormat
      thousandSeparator={true}
      thousandsGroupStyle="thousand"
      prefix={props.prefix}
      value={props.balance}
      displayType="text"
      decimalScale={2}
      fixedDecimalScale={true}
    />
	);
}

export default BalanceFormat;