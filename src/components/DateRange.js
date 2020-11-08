import React, { useState } from "react";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";

export function DateRange({ start, end, onStartChange, onEndChange }) {
  const [startDate, setStartDate] = useState(start || dayjs().toDate());
  const [endDate, setEndDate] = useState(end || dayjs().add(1, "month").toDate());

  const handleStartChange = (date) => {
    setStartDate(date);
    if (!!onStartChange) {
      onStartChange(date);
    }
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    if (!!onEndChange) {
      onEndChange(date);
    }
  };

  return (
    <div className="pb-4">
      <fieldset>
        <legend>Project start and end</legend>

        <div className="flex">
          <div>
            <VisuallyHidden>
              <label>Project start date</label>
            </VisuallyHidden>
            <DatePicker
              selected={startDate}
              onChange={handleStartChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="mr-2 border-tandemMdGray border-b border-t-0 border-l-0 border-r-0 mb-2 leading-4 p-2"
              style={{ minHeight: "2.5rem" }}
            />
          </div>
          <div>
            <VisuallyHidden>
              <label>Project end date</label>
            </VisuallyHidden>
            <DatePicker
              selected={endDate}
              onChange={handleEndChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="ml-2 border-tandemMdGray border-b border-t-0 border-l-0 border-r-0 mb-2 leading-4 p-2"
              style={{ minHeight: "2.5rem" }}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
