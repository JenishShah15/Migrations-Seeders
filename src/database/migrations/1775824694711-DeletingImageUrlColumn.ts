import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletingImageUrlColumn1775824694711 implements MigrationInterface {
    name = 'DeletingImageUrlColumn1775824694711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" text`);
    }

}
