import React from 'react';
import { Symbols } from '../../../contexts/symbols';

interface SymbolRowProps {
  symbols: Symbols;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SymbolRow = ({symbols, onClick}:SymbolRowProps) => {
  return (
    <tr>
            <td className="text-gray-900">
                {symbols.symbol}
                {symbols.isFavorite
                    ? <svg className="icon icon-xs" fill="yellow" stroke="orange" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    : <React.Fragment></React.Fragment>
                }
            </td>
            <td className="text-gray-900">
                {symbols.basePrecision}
            </td>
            <td className="text-gray-900">
                {symbols.quotePrecision}
            </td>
            <td className="text-gray-900">
                {symbols.minNotional}
            </td>
            <td className="text-gray-900">
                {symbols.minLotSize}
            </td>
            <td>{/* @ts-ignore*/}
                <button id={"edit" + symbols.symbol} className="btn btn-secondary animate-up-2" width={32} onClick={onClick} data-bs-toggle="modal" data-bs-target="#modalSymbol">
                    <svg id={"edit" + symbols.symbol} className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </td>
        </tr>
  );
}

export default SymbolRow;