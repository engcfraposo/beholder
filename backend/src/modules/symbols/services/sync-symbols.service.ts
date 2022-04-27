import settingsRepository from "../../sessions/repositories/settings.repository";
import symbolsRepository from "../repositories/symbols.repository";
import exchange from "../../../utils/exchange";
import crypto from "../../../utils/crypto";

interface SyncSymbolsResponse {
  error?: string;
  status: number;
  symbols?: any;
}

const SyncSymbolsService =  async ({id}:{id:number}): Promise<SyncSymbolsResponse> => {
  const settings = await settingsRepository.getById(id);
  if(!settings){
    return { error: '401 Unauthorized', status: 401 };
  }
  //@ts-ignore
  settings.secretKey = crypto.decrypt(settings.secretKey);
  const { exchangeInfo } = exchange(settings);
  if(!exchangeInfo){
    return { error: '500 Internal Server Error', status: 500 };
  }
  const { symbols: exchangeSymbols } = await exchangeInfo();
  
  if(!exchangeSymbols){
    return { error: '500 Internal Server Error', status: 500 };
  }

  const symbols = exchangeSymbols.map((symbolMapped: { symbol: string, baseAssetPrecision: any; quoteAssetPrecision: any; filters: any[]; }) => {
    return {
      symbol: symbolMapped.symbol,
      basePrecision: symbolMapped.baseAssetPrecision,
      quotePrecision: symbolMapped.quoteAssetPrecision,
      minNotional: symbolMapped.filters.find((filter: { filterType: string; }) => filter.filterType === 'MIN_NOTIONAL').minNotional,
      minLotSize: symbolMapped.filters.find((filter: { filterType: string; }) => filter.filterType === 'LOT_SIZE').minQty,
      isFavorite: false,
    };
  });

  await symbolsRepository.deleteAll();

  const syncSymbols = await symbolsRepository.bulkInsert(symbols);
  
  return {
    status: 200,
    symbols: syncSymbols,
  };
}

export default SyncSymbolsService;