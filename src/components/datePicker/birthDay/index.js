import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./index.scss";

const BirthDayDatePicker = props => {

  const selectedDate = props.selected ? new Date(props.selected) : "";

  const maxDate = () => {
    const _date = new Date();
    const day = ("0" + _date.getDate()).slice(-2);
    const month = ("0"+(_date.getMonth()+1)).slice(-2);
    const year = _date.getFullYear() - 18;
    const _sDate = `${year}-${month}-${day}`;
    return new Date(_sDate);
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={date => props.onChange(date)}
      dateFormat="yyyy-MM-dd"
      maxDate={maxDate()}
    />
  );
}

export default BirthDayDatePicker;