import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
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
