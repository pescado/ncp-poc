import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.scss';

type InputProps = {
  id: string;
};

export default function F9DatePicker(inputProps: InputProps) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => date && setStartDate(date)}
        id={inputProps.id}
        monthsShown={2}
      />
    </div>
  );
}
