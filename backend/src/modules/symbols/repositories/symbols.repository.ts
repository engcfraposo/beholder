import Symbols  from '../../../models/symbol.model';


interface NewSymbol {
    symbol: string;
    basePrecision: number;
    quotePrecision: number;
    minNotional: string;
    minLotSize: string;
    isFavorite: boolean;
}
const getBySymbol = async (symbol?: string) => {
  if(!symbol){
    return Symbols.findAll();
  }
    const { dataValues }: any = await Symbols.findOne({ where: {symbol} });
    return dataValues;
}
const update = async (symbols: NewSymbol) => {
    return Symbols.update(symbols, { where: {symbol: symbols.symbol} });
}
const deleteAll = async () => {
    return Symbols.destroy({ truncate: true });
}
const bulkInsert = async (symbols: NewSymbol[]) => {
    return Symbols.bulkCreate(symbols as any);
}

export default {
    getBySymbol,
    update,
    deleteAll,
    bulkInsert
};