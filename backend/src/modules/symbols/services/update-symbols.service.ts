import symbolsRepository from "../repositories/symbols.repository";

interface UpdateSymbolsRequest {
  symbol: string;
  basePrecision: number;
  quotePrecision: number;
  minLotSize: string;
  minNotional: string;
  isFavorite: boolean;
}

interface UpdateSymbolsResponse {
  error?: string;
  status: number;
  symbols?: any;
}

const UpdateSymbolsService =  async (symbols:UpdateSymbolsRequest): Promise<UpdateSymbolsResponse> => {
  const hasSymbol = await symbolsRepository.getBySymbol(symbols.symbol);
  if(!hasSymbol){
    return { error: '401 Unauthorized', status: 401 };
  }

  if(
    symbols.basePrecision && 
    symbols.basePrecision !== hasSymbol.basePrecision
    ){
    hasSymbol.basePrecision = symbols.basePrecision;
  }

  if(
    symbols.quotePrecision && 
    symbols.quotePrecision !== hasSymbol.quotePrecision
    ){
    hasSymbol.quotePrecision = symbols.quotePrecision;
  }

  if(
    symbols.minLotSize &&
    symbols.minLotSize !== hasSymbol.minLotSize
    ){
    hasSymbol.minLotSize = symbols.minLotSize;
  }

  if(
    symbols.minNotional &&
    symbols.minNotional !== hasSymbol.minNotional
    ){
    hasSymbol.minNotional = symbols.minNotional;
  }

  if(
    symbols.isFavorite !== null &&
    symbols.isFavorite !== undefined &&
    symbols.isFavorite !== hasSymbol.isFavorite
    ){
    hasSymbol.isFavorite = symbols.isFavorite;
  }

  const newSymbol = await symbolsRepository.update(hasSymbol);

  if(!newSymbol){
    return { error: '500 Internal Server Error', status: 500 };
  }

  return {
    status: 200,
    symbols: newSymbol,
  };

}

export default UpdateSymbolsService;