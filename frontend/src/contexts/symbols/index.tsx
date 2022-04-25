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
  symbolsSettings: Symbols[];
  symbolsMiniTicker: Symbols[];
  symbol: Symbols;
  quoteSymbols: string;
  quoteMiniTicker: string;
  isSyncing: boolean;
  syncSymbols: () => void;
  getSymbol({symbol}:{symbol:string}): void;
  getSymbolsSettings(): void;
  getSymbolsMiniTicker(): void;
  updateSymbol(newSymbols:Symbols): void;
  changeQuoteSymbols(e: React.ChangeEvent<HTMLSelectElement>): void;
  changeQuoteMiniTicker(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const SymbolsContext = createContext<SymbolsContextData>({} as SymbolsContextData);

export const SymbolsProvider = ({ children }: Props) => {
  const { symbolModal } = useModal();
  const [ symbolsSettings, setSymbolsSettings ] = useState<Symbols[]>([]);
  const [ symbolsMiniTicker, setSymbolsMiniTicker ] = useState<Symbols[]>([]);
  const [ symbol, setSymbol ] = useState<Symbols>({} as Symbols);
  const [quoteSymbols, setQuoteSymbols] = useState<string>("USD");
  const [quoteMiniTicker, setQuoteMiniTicker] = useState<string>("USD")
  const [ isSyncing, setIsSyncing ] = useState(false);
  const { data } = useAuth();

  const getSymbolsMiniTicker = useCallback(async () => {
    const response = await api.get('/symbols');
    const originalSymbols = response.data.data.symbols as Symbols[];
    const filteredSymbols = originalSymbols.filter(s => {
      if (quoteMiniTicker === 'FAVORITES'){
          return s.isFavorite === true;
      }
      return s.symbol.endsWith(quoteMiniTicker);
    });
    setSymbolsMiniTicker(filteredSymbols);
  },[quoteMiniTicker])

  const getSymbolsSettings = useCallback(async () => {
    const response = await api.get('/symbols');
    const originalSymbols = response.data.data.symbols as Symbols[];
    const filteredSymbols = originalSymbols.filter(s => {
      if (quoteSymbols === 'FAVORITES'){
          return s.isFavorite === true;
      }
      return s.symbol.endsWith(quoteSymbols);
    });
    setSymbolsSettings(filteredSymbols);
  },[quoteSymbols])

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
    setSymbolsSettings(response.data.data.symbols);
    setIsSyncing(false);
  },[])

  const changeQuoteSymbols = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuoteSymbols(e.target.value);
  },[])

  const changeQuoteMiniTicker = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuoteMiniTicker(e.target.value);
  },[])

  useEffect(() => {
    if(data.token) {
      getSymbolsSettings();
    }
  } ,[data.token, isSyncing, quoteSymbols]);

  useEffect(() => {
    if(data.token) {
      getSymbolsMiniTicker();
    }
  } ,[data.token, quoteMiniTicker]);

  useEffect(() => {
    if(data.token && symbolModal) {
      getSymbol({symbol: symbolModal});
    }
  } ,[data.token, symbolModal]);
  return (
    <SymbolsContext.Provider
      value={{ 
        quoteSymbols,
        quoteMiniTicker,
        symbolsSettings,
        symbolsMiniTicker,
        symbol,
        isSyncing,
        syncSymbols,
        getSymbol,
        getSymbolsSettings,
        getSymbolsMiniTicker,
        updateSymbol,
        changeQuoteSymbols,
        changeQuoteMiniTicker
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