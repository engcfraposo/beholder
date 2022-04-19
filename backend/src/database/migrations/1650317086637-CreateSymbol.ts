import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSymbol1650317086637 implements MigrationInterface {
    name = 'CreateSymbol1650317086637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "symbols" ("id" int NOT NULL IDENTITY(1,1), "symbol" nvarchar(255) NOT NULL, "basePrecision" int NOT NULL, "quotePrecision" int NOT NULL, "minNotional" nvarchar(255) NOT NULL, "minLotSize" nvarchar(255) NOT NULL, "isFavorite" bit NOT NULL CONSTRAINT "DF_66b72ca4ee5963e800b0deabab2" DEFAULT 0, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_0e9d558564d9a4fbc398091ec53" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_71f736114044e438847f9fb372f" DEFAULT getdate(), CONSTRAINT "PK_f9967bf9e35433b0a81ad95f8bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8537c94ae17acdcbd2cc15c99a" ON "symbols" ("symbol") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_8537c94ae17acdcbd2cc15c99a" ON "symbols"`);
        await queryRunner.query(`DROP TABLE "symbols"`);
    }

}
