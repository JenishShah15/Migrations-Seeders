import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1774349202014 implements MigrationInterface {
    name = 'CreateProductTable1774349202014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "brandname" character varying(200) NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "rating" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_686fd033da4d2d5954daab89290" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_686fd033da4d2d5954daab89290"`);
        await queryRunner.query(`DROP TABLE "Products"`);
    }

}
