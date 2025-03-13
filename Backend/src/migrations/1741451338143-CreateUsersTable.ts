import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1698765432000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) UNIQUE NOT NULL,
                "password" VARCHAR(255) NOT NULL
            );

            CREATE TABLE "category" (
                "categoryId" SERIAL PRIMARY KEY,
                "categoryName" VARCHAR(255) UNIQUE NOT NULL
            );

            CREATE TABLE "expense" (
                "expenseId" SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL,
                "title" VARCHAR(255) NOT NULL,
                "cost" FLOAT NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW(),
                "updatedAt" TIMESTAMP DEFAULT NOW(),
                CONSTRAINT "fk_user" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
            );

            CREATE TABLE "expense_category" (
                "expenseId" INTEGER NOT NULL,
                "categoryId" INTEGER NOT NULL,
                PRIMARY KEY ("expenseId", "categoryId"),
                CONSTRAINT "fk_expense" FOREIGN KEY ("expenseId") REFERENCES "expense" ("expenseId") ON DELETE CASCADE,
                CONSTRAINT "fk_category" FOREIGN KEY ("categoryId") REFERENCES "category" ("categoryId") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "expense_category";
            DROP TABLE "expense";
            DROP TABLE "category";
            DROP TABLE "user";
        `);
    }
}