import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSettings1650294138099 implements MigrationInterface {
    name = 'CreateSettings1650294138099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" int NOT NULL IDENTITY(1,1), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "apiUrl" nvarchar(255) NOT NULL, "accessKey" nvarchar(255) NOT NULL, "secretKey" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_cd6741b87b0a4abdf6af11b04bb" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_c43cc872fe27c01975265e03a3a" DEFAULT getdate(), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_aa2f35392f3bb959d57f06da40" ON "settings" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_aa2f35392f3bb959d57f06da40" ON "settings"`);
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
