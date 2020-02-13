import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchDatePicker = props => {

  const filterThreeMonthsAgo = () => {
    const _date = new Date();
    _date.setMonth(_date.getMonth()-3);
    const day = ("0" + _date.getDate()).slice(-2);
    const month = ("0"+(_date.getMonth()+1)).slice(-2);
    const year = _date.getFullYear();
    const _sDate = `${year}-${month}-${day}`;
    return new Date(_sDate);
  }

  return (
    <DatePicker
      selected={props.selected}
      onChange={date => props.onChange(date)}
      dateFormat="yyyy-MM-dd"
      maxDate={new Date()}
      minDate={filterThreeMonthsAgo()}
    />
  );
}

export default SearchDatePicker;