import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDiscussedImageUrlColumn1775824899859 implements MigrationInterface {
    name = 'AddingDiscussedImageUrlColumn1775824899859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "imageUrl" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "imageUrl"`);
    }

}
