import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteringProductTableUserId1775555220457 implements MigrationInterface {
    name = 'AlteringProductTableUserId1775555220457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "userId" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "userId"`);
    }

}
