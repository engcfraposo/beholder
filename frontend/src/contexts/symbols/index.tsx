import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';

import api from '../../api';
import { useAuth } from '../auth';
import { useModal } from '../modal';

export interface Symbols {
  symbol: string;
  basePrecision: number;
  quotePrecision: number;
  minLotSize: string;
  minNotional: string;
  isFavorite: boolean;
}

interface SymbolsContextData {
  symbols: Symbols[];
  symbol: Symbols;
  quote: string;
  isSyncing: boolean;
  syncSymbols: () => void;
  getSymbol({symbol}:{symbol:string}): void;
  getSymbols(): void;
  updateSymbol(newSymbols:Symbols): void;
  changeQuote(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const SymbolsContext = createContext<SymbolsContextData>({} as SymbolsContextData);

export const SymbolsProvider = ({ children }: Props) => {
  const { symbolModal } = useModal();
  const [ symbols, setSymbols ] = useState<Symbols[]>([]);
  const [ symbol, setSymbol ] = useState<Symbols>({} as Symbols);
  const [quote, setQuote] = useState<string>("USD");
  const [ isSyncing, setIsSyncing ] = useState(false);
  const { data } = useAuth();

  const getSymbols = useCallback(async () => {
    const response = await api.get('/symbols');
    const originalSymbols = response.data.data.symbols as Symbols[];
    const filteredSymbols = originalSymbols.filter(s => {
      if (quote === 'FAVORITES'){
          return s.isFavorite === true;
      }
      return s.symbol.endsWith(quote);
    });
    setSymbols(filteredSymbols);
  },[quote])

  const getSymbol = useCallback(async ({symbol: requestSymbol}:{symbol:string}) => {
    const response = await api.get(`/symbols/${requestSymbol}`);
    setSymbol(response.data.data.symbols);
  },[])

  const updateSymbol = useCallback(async (newSymbols:Symbols) => {
    await api.patch(`/symbols/${newSymbols.symbol}`, {
      basePrecision: newSymbols.basePrecision,
      quotePrecision: newSymbols.quotePrecision,
      minLotSize: newSymbols.minLotSize,
      minNotional: newSymbols.minNotional,
      isFavorite: newSymbols.isFavorite
    });
  },[])

  const syncSymbols = useCallback(async () => {
    setIsSyncing(true);
    const response = await api.post('/symbols/sync');
    setSymbols(response.data.data.symbols);
    setIsSyncing(false);
  },[])

  const changeQuote = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setQuote(e.target.value);
  },[])

  useEffect(() => {
    if(data.token) {
      getSymbols();
    }
  } ,[data.token, isSyncing, quote]);

  useEffect(() => {
    if(data.token && symbolModal) {
      getSymbol({symbol: symbolModal});
    }
  } ,[data.token, symbolModal]);
  return (
    <SymbolsContext.Provider
      value={{ 
        quote,
        symbols,
        symbol,
        isSyncing,
        syncSymbols,
        getSymbol,
        getSymbols,
        updateSymbol,
        changeQuote,
      }}
    >
      {children}
    </SymbolsContext.Provider>
  );
};

export function useSymbols(): SymbolsContextData {
  const context = useContext(SymbolsContext);

  if (!context) {
    throw new Error('useSymbols must be used within an SymbolsProvider');
  }

  return context;
}