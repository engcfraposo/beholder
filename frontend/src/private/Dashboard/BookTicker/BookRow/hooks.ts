import { useEffect, useState } from 'react';

export interface Data {
  bestBid: string;
  bestAsk: string;
}


export interface DataState {
  bid: string;
  ask: string;
}

const useBookRow = (data: Data) => {
  const [localData, setLocalData] = useState<DataState>({
    bid: '0',
    ask: '0',
  });

  useEffect(() => {
    let changeData = localData;
    if (!data) return;

    if(data.bestBid !== localData.bid) {
      changeData.bid = data.bestBid;
    }

    if(data.bestAsk !== localData.ask) {
      changeData.ask = data.bestAsk;
    }

    setLocalData(changeData);
}, [data]);
  
  return{localData};
}

export default useBookRow;