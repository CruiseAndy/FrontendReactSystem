import React from 'react';

const CompInput = props => {

  return (
    <div className="input_group">
      <span className="input_title">{props.title}</span>
      <input
        type="text"
        className="input_control"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default CompInput;