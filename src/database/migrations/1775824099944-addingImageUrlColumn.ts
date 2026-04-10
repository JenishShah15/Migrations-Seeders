import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingImageUrlColumn1775824099944 implements MigrationInterface {
    name = 'AddingImageUrlColumn1775824099944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
    }

}
