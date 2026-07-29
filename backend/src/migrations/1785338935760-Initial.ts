import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1785338935760 implements MigrationInterface {
    name = 'Initial1785338935760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c354126cfe466a6d45c12dc4f1" ON "change_requests" ("status", "approvedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f8a5ed7f033c34f599958a68e" ON "change_requests" ("createdById", "status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2f8a5ed7f033c34f599958a68e" ON "change_requests"`);
        await queryRunner.query(`DROP INDEX "IDX_c354126cfe466a6d45c12dc4f1" ON "change_requests"`);
    }

}
