import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

export interface Data {
  close: string;
  high: string;
  low: string;
  open: string;
}

const useTickerRow = (data: Data) => {
  const [localData, setLocalData] = useState<Data>({
    close: '0',
    high: '0',
    low: '0',
    open: '0',
  });

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
  
  return{localData};
}

export default useTickerRow;