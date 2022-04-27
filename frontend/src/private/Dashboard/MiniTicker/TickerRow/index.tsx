import { useMemo } from 'react';
import useTickerRow from './hooks';

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
  const { localData } = useTickerRow(data);

  return(useMemo(() => (
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
}

export default TickerRow;