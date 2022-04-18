import config from "./config.json";
import bcrypt from "bcrypt";
import crypto from "../../utils/crypto";
import db from "..";
import { Settings } from "../../models/settings.model";

class Seeds {
    async up() {
      await db.initialize()
      const settingsId = await db.createQueryBuilder(Settings, "settings")
        .select("id").where("settings.id = :id", { id: 1 }).getRawOne();
        if(!settingsId){
          await db.createQueryBuilder()
          .insert()
          .into(Settings)
          .values([
              { 
                email: config.EMAIL, 
                password: bcrypt.hashSync(config.PASSWORD, 10), 
                apiUrl: config.API_URL, 
                accessKey: config.ACCESS_KEY, 
                secretKey: crypto.encrypt(config.SECRET_KEY), 
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
      .from(Settings)
      .execute();
    }
}

export default new Seeds();

