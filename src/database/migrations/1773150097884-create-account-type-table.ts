import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTypeTable1773150097884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TYPE account_types_category_enum AS ENUM(
            'ASSETS',
        'LIABILITIES',
        'INCOME_DIRECT',
        'EXPENSE_DIRECT',
        'INCOME_INDIRECT',
        'EXPENSE_INDIRECT'
            )`);

         await queryRunner.query(`
            CREATE TYPE account_financial_statement_enum AS ENUM (
                'balancesheet',
                'trading',
                'p_and_l'
            );
        `);


            await queryRunner.query(`
                    CREATE TABLE IF NOT EXISTS account_types(
                    account_types_id uuid NOT NULL DEFAULT uuid_generate_v4(),
                    name varchar(100) not null,
                    description varchar(255),
                    created_by uuid,
                    updated_by uuid,
                    deleted_by uuid,
                    is_deleted boolean default false,
                    created_at bigint DEFAULT EXTRACT(epoch FROM CURRENT_TIMESTAMP),
                     updated_at bigint DEFAULT EXTRACT(epoch FROM CURRENT_TIMESTAMP),
                    deleted_at bigint,
                    organization_public_id uuid,
                    category account_types_category_enum,
                    is_debit_default boolean DEFAULT true,
                    is_active boolean DEFAULT true,
                    code varchar(50),
                    financial_statement_types account_financial_statement_enum,
                    default_data boolean,
                    is_default boolean DEFAULT false,
                    CONSTRAINT account_types_pkey PRIMARY KEY (account_types_id)
                    );
                `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('DROP TABLE IF EXISTS account_types');
        await queryRunner.query(`DROP TYPE IF EXISTS account_types_category_enum`);

        await queryRunner.query(`DROP TYPE IF EXISTS account_financial_statement_enum`);
    }

}
