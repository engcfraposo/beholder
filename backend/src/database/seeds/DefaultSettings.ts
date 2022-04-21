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
                email: process.env.EMAIL, 
                password: bcrypt.hashSync(process.env.PASSWORD as string, 10), 
                apiUrl: process.env.API_URL, 
                accessKey: process.env.ACCESS_KEY, 
                secretKey: crypto.encrypt(process.env.SECRET_KEY as string), 
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

