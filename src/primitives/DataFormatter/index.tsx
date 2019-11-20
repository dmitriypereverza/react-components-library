import React from "react";
import moment from "moment";

interface DataFormatterInterface {
  value: string;
  fromFormat: string;
  toFormat: string;
}

function DataFormatter({
  value,
  fromFormat,
  toFormat,
}: DataFormatterInterface) {
  return <>{moment(value, fromFormat).format(toFormat)}</>;
}

export default React.memo(DataFormatter);
