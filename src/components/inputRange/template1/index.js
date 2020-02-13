/* tool */
import React, { useState, useEffect } from 'react';

import "./index.scss";

const InputRange = ({
	value=0,
	min=0,
	max=100,
	step=1,
	onChange={},
	disabled=false,
	readOnly=false
}) => {

	const inputDecrease = () => {
		if ((parseInt(value) - parseInt(step)) < parseInt(min))
			return;

		onChange(parseInt(value) - parseInt(step));
	}

	const inputIncrease = () => {
		if ((parseInt(value) + parseInt(step)) > parseInt(max))
			return;

		onChange(parseInt(value) + parseInt(step));
	}

	const checkRange = () => {
		if (parseInt(value) < parseInt(min))
			onChange(min);

		if (parseInt(value) > parseInt(max))
			onChange(max);
	}

	return (
		<div className="input_range_component">
      <div
				className={parseInt(value) > parseInt(min) ? "adjust_box" : "adjust_box disabled"}
				onClick={() => inputDecrease()}
			>
				<span className="adjust_symbol">-</span>
			</div>
      <div className="input_box">
				<input
					type="number"
					className="adjust_input"
					value={value}
					min={min}
					max={max}
					onChange={e => onChange(e.target.value)}
					disabled={disabled}
					readOnly={readOnly}
					onBlur={() => checkRange()}
				/>
			</div>
      <div
				className={parseInt(value) < parseInt(max) ? "adjust_box" : "adjust_box disabled"}
				onClick={() => inputIncrease()}
			>
				<span className="adjust_symbol">+</span>
			</div>
		</div>
	);
};

export default InputRange;