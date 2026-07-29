import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1785255154760 implements MigrationInterface {
    name = 'Initial1785255154760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "role" varchar(50) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_57e6188f929e5dc6919168620c8" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "currentPrice" decimal(10,2), "currentAvailability" bit NOT NULL CONSTRAINT "DF_1d662f8e8cb4efd60f2403b4def" DEFAULT 1, "description" text, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_0e50002dc57a575e3d05f168d06" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_c1af827af9bef60bb16e13c03ae" DEFAULT getdate(), CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "change_requests" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_e3f28255a6e818820f18f6d5956" DEFAULT NEWSEQUENTIALID(), "requestNumber" nvarchar(255) NOT NULL, "itemId" uniqueidentifier NOT NULL, "changeType" varchar(50) NOT NULL, "oldValue" text, "newValue" text NOT NULL, "reason" text NOT NULL, "status" varchar(50) NOT NULL CONSTRAINT "DF_bdd1bb48908a672510fdb5ecb35" DEFAULT 'PENDING', "createdById" uniqueidentifier NOT NULL, "approvedById" uniqueidentifier, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_1a1ee549020343192f44d63e0ab" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_e84c6785995b17cce96d6b4cb04" DEFAULT getdate(), "approvedAt" datetime, CONSTRAINT "UQ_f7a0e5f8c7b9fbbdeae7159b006" UNIQUE ("requestNumber"), CONSTRAINT "PK_e3f28255a6e818820f18f6d5956" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "FK_2dddb59f161f0a0495a040110a8" FOREIGN KEY ("itemId") REFERENCES "menu_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "FK_a3029334f3a0315438276ab97c5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "change_requests" ADD CONSTRAINT "FK_6330ee962bd63ebdd15c2060e38" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "FK_6330ee962bd63ebdd15c2060e38"`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "FK_a3029334f3a0315438276ab97c5"`);
        await queryRunner.query(`ALTER TABLE "change_requests" DROP CONSTRAINT "FK_2dddb59f161f0a0495a040110a8"`);
        await queryRunner.query(`DROP TABLE "change_requests"`);
        await queryRunner.query(`DROP TABLE "menu_items"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
