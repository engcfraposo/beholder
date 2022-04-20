import { Symbols } from '../../../models/symbols.model';
import db from '../../../database';

class symbolsRepository {
    symbolsRepository = db.getRepository(Symbols);
    getBySymbol = async (symbol?: string) => {
      if(!symbol){
        return this.symbolsRepository.find();
      }
        return this.symbolsRepository.findOneBy({ symbol });
    }
    getById = async (id: number) => {
        return this.symbolsRepository.findOneBy({id});
    }
    update = async (symbols: Symbols) => {
        return this.symbolsRepository.save(symbols);
    }
    deleteAll = async () => {
        return this.symbolsRepository.delete({});
    }
    bulkInsert = async (symbols: Symbols[]) => {
        return this.symbolsRepository.save(symbols);
    }
}

export default symbolsRepository;