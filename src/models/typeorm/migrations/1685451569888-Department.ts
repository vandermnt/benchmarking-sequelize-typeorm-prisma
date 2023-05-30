import { MigrationInterface, QueryRunner } from "typeorm";

export class Department1685451569888 implements MigrationInterface {
    name = 'Department1685451569888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "cpf" integer NOT NULL, "phone" integer NOT NULL, "department_id" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
