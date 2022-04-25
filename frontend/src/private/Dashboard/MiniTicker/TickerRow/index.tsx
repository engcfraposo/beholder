import { useEffect, memo, useState, useMemo } from 'react';

interface Data {
  close: string;
  high: string;
  low: string;
  open: string;
}

interface TickerRowProps {
  data: Data,
  symbol: string,
}

const TickerRow = ({data, symbol}:TickerRowProps) => {
  const [localData, setLocalData] = useState<Data>({
    close: '0',
    high: '0',
    low: '0',
    open: '0',
  });

  const tickerRow = (useMemo(() => (
        <tr>
            <td className="text-gray-900">
                {symbol}
            </td>
            <td className="text-gray-900">
                {`${localData.close}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${localData.open}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${localData.high}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${localData.low}`.substring(0, 8)}
            </td>
        </tr>
  ),[localData.close, localData.high, localData.low, localData.open]));

  useEffect(() => {
    let changeData = localData;
    if (!data || !data.open) return;

    if(data.open !== localData.open) {
      changeData.open = data.open;
    }

    if(data.close !== localData.close) {
      changeData.close = data.close;
    }

    if(data.high !== localData.high) {
      changeData.high = data.high;
    }

    if(data.low !== localData.low) {
      changeData.low = data.low;
    }
    setLocalData(changeData);
}, [data]);

  return(tickerRow);
}

export default TickerRow;