import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConstraints1785296633173 implements MigrationInterface {
    name = 'UpdateConstraints1785296633173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "FK_2dddb59f161f0a0495a040110a8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD "name" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "UQ_f7a0e5f8c7b9fbbdeae7159b006"`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP COLUMN "requestNumber"`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD "requestNumber" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "UQ_f7a0e5f8c7b9fbbdeae7159b006" UNIQUE ("requestNumber")`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP COLUMN "approvedAt"`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD "approvedAt" datetime2`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "FK_2dddb59f161f0a0495a040110a8" FOREIGN KEY ("itemId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "FK_2dddb59f161f0a0495a040110a8"`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP COLUMN "approvedAt"`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD "approvedAt" datetime`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "UQ_f7a0e5f8c7b9fbbdeae7159b006"`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP COLUMN "requestNumber"`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD "requestNumber" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "UQ_f7a0e5f8c7b9fbbdeae7159b006" UNIQUE ("requestNumber")`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD "name" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "FK_2dddb59f161f0a0495a040110a8" FOREIGN KEY ("itemId") REFERENCES "menu_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
