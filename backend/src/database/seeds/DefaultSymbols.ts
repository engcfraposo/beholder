import config from "./config.json";
import bcrypt from "bcrypt";
import crypto from "../../utils/crypto";
import db from "..";
import { Symbols } from "../../models/symbols.model";

class Seeds {
    async up() {
      await db.initialize()
      const symbolId = await db.createQueryBuilder(Symbols, "symbols")
        .select("id").where("symbols.id = :id", { id: 1 }).getRawOne();
        if(!symbolId){
          await db.createQueryBuilder()
          .insert()
          .into(Symbols)
          .values([
              { 
                symbol: "BTCBUSD",
                basePrecision: 8,
                quotePrecision: 8,
                minNotional: "0.1",
                minLotSize: "0.1",
                isFavorite: true,
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
          ])
        .execute();
      }
      return
    }
    async down() {
      return db
      .createQueryBuilder()
      .delete()
      .from(Symbol)
      .execute();
    }
}

export default new Seeds();

