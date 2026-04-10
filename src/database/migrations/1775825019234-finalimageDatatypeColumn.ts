import { MigrationInterface, QueryRunner } from "typeorm";

export class FinalimageDatatypeColumn1775825019234 implements MigrationInterface {
    name = 'FinalimageDatatypeColumn1775825019234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" bytea `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" text NOT NULL DEFAULT ''`);
    }

}
