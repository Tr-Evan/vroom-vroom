import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1764086548394 implements MigrationInterface {
    name = 'CreateTables1764086548394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`announcement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cars_id\` int NOT NULL, \`stats_id\` int NOT NULL, \`date\` date NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`famous\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cars_id\` int NOT NULL, \`favoris\` int NOT NULL DEFAULT '0', \`views\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_afc7bced2950ea7472dda32a2f\` (\`cars_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`marque\` varchar(255) NOT NULL, \`perf\` varchar(255) NULL, \`user_id\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`announcement\` ADD CONSTRAINT \`FK_e3dbea6f60e234ff4095566d7c9\` FOREIGN KEY (\`cars_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announcement\` ADD CONSTRAINT \`FK_f206b723a72b9a3039975120195\` FOREIGN KEY (\`stats_id\`) REFERENCES \`stats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stats\` ADD CONSTRAINT \`FK_afc7bced2950ea7472dda32a2f9\` FOREIGN KEY (\`cars_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_673bd295e52580c0fb09d0fbbb8\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_673bd295e52580c0fb09d0fbbb8\``);
        await queryRunner.query(`ALTER TABLE \`stats\` DROP FOREIGN KEY \`FK_afc7bced2950ea7472dda32a2f9\``);
        await queryRunner.query(`ALTER TABLE \`announcement\` DROP FOREIGN KEY \`FK_f206b723a72b9a3039975120195\``);
        await queryRunner.query(`ALTER TABLE \`announcement\` DROP FOREIGN KEY \`FK_e3dbea6f60e234ff4095566d7c9\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`cars\``);
        await queryRunner.query(`DROP INDEX \`REL_afc7bced2950ea7472dda32a2f\` ON \`stats\``);
        await queryRunner.query(`DROP TABLE \`stats\``);
        await queryRunner.query(`DROP TABLE \`announcement\``);
    }

}
