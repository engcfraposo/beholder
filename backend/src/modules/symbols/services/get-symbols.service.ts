import { Symbols } from "../../../models/symbols.model";
import SymbolsRepository from "../repositories/symbols.repository";

interface GetSymbolsResponse {
  error?: string;
  status: number;
  symbols?: Symbols | Symbols[];
}

const GetSymbolsService =  async ({symbol}:{symbol?:string}): Promise<GetSymbolsResponse> => {
  const symbolsRepository = new SymbolsRepository();
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