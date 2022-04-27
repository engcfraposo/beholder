import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';

import api from '../../api';
import { useAuth } from '../auth';
import { useError } from '../error';

interface Balances {
  symbol: string;
  available: string;
  onOrder: string;
}

interface BalancesContextData {
  balances: Balances[];
  getBalances: () => void;
  updateBalances: () => void;
}

const BalancesContext = createContext<BalancesContextData>({} as BalancesContextData);

export const BalancesProvider = ({ children }: Props) => {
  const {data} = useAuth();
  const [hasUpdate, setHasUpdate] = useState<boolean>(true);
  const [ balances, setBalances ] = useState<Balances[]>([
    {symbol:'BTC', available: '0', onOrder: '0' },
    {symbol:'ETH', available: '0', onOrder: '0' },
    {symbol:'LTC', available: '0', onOrder: '0' },
    {symbol:'XRP', available: '0', onOrder: '0' },
  ]);

  const getBalances = useCallback(async () => {
    const response = await api.get('/exchange/balance')
    const parsedBalance = Object.entries(response.data.data.balance).map((item:any) =>{
      return {
        symbol: item[0],
        available: item[1].available,
        onOrder: item[1].onOrder,
      } as Balances
    })
    setBalances(parsedBalance)
    setHasUpdate(false);
  },[]);

  const updateBalances = useCallback(async () => {
    setHasUpdate(true);
  },[]);

  useEffect(() => {
    if(data.token) {
      getBalances();
    }
  },[data.token, hasUpdate])

  return (
    <BalancesContext.Provider
      value={{ 
        balances,  
        updateBalances,
        getBalances,
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
};

export function useBalances(): BalancesContextData {
  const context = useContext(BalancesContext);

  if (!context) {
    throw new Error('useBalances must be used within an BalancesProvider');
  }

  return context;
}