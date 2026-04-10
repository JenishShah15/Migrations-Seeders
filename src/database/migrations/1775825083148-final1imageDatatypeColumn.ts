import { MigrationInterface, QueryRunner } from "typeorm";

export class Final1imageDatatypeColumn1775825083148 implements MigrationInterface {
    name = 'Final1imageDatatypeColumn1775825083148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" text NOT NULL DEFAULT ''`);
    }

}
