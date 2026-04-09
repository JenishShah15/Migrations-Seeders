import { MigrationInterface, QueryRunner } from "typeorm";

export class Adddeletedatecolumn1775732918835 implements MigrationInterface {
    name = 'Adddeletedatecolumn1775732918835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "rating" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "rating" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "deletedAt"`);
    }

}
