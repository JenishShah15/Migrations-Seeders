import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingeditingImageUrlColumn1775824184922 implements MigrationInterface {
    name = 'AddingeditingImageUrlColumn1775824184922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "imageUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "imageUrl" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "imageUrl" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

}
