import symbolsRepository from "../repositories/symbols.repository";

interface GetSymbolsResponse {
  error?: string;
  status: number;
  symbols?: any;
}

const GetSymbolsService =  async ({symbol}:{symbol?:string}): Promise<GetSymbolsResponse> => {
  const symbols = await symbolsRepository.getBySymbol(symbol);

  if(!symbols){
    return { error: '404 Not Found', status: 404 };
  }

  return {
    status: 200,
    symbols,
  };

}

export default GetSymbolsService;