import { useMemo } from "react";
import useBookRow, { Data } from "./hooks";


interface BookRowProps {
  data: Data,
  symbol: string,
}

const BookRow = ({data, symbol}:BookRowProps) => {
  const { localData } = useBookRow(data);
  return(useMemo(() => (
        <tr>
            <td className="text-gray-900">
                {symbol}
            </td>
            <td className="text-gray-900">
                {`${localData.bid}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${localData.ask}`.substring(0, 8)}
            </td>
        </tr>
  ),[localData.ask, localData.bid]));
}

export default BookRow;


