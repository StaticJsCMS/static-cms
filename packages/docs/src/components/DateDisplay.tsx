import { addMinutes, format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

function formatDate(date: Date, dateFormat: string) {
  return format(addMinutes(date, date.getTimezoneOffset()), dateFormat);
}

interface DateDisplayProps {
  date: string;
  format: string;
}

const DateDisplay = ({ date: dateString, format: dateFormat }: DateDisplayProps) => {
  const [date, setDate] = useState(`${formatDate(parseISO(dateString), dateFormat)} UTC`);

  useEffect(() => {
    setDate(format(parseISO(dateString), dateFormat));
  }, [dateFormat, dateString]);

  return <>{date}</>;
};

export default DateDisplay;
