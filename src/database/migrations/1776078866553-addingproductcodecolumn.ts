import { MigrationInterface, QueryRunner } from "typeorm";

export class Addingproductcodecolumn1776078866553 implements MigrationInterface {
    name = 'Addingproductcodecolumn1776078866553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "productcode" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "productcode"`);
    }

}
