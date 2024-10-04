import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReserves1728054425205 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'reserves',

      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'int'
        },
        {
          name: 'model',
          type: 'varchar(50)',

        },
        {
          name: 'color',
          type: 'varchar(30)'
        },

        {
          name: 'year',
          type: 'int'
        },
        {
          name: 'valuePerDay',
          type: 'int'
        },
        {
          name: 'numberOfPassengers',
          type: 'int'
        }
      ],
      foreignKeys: [
        {
          name: 'Car',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      ],

      foreignKeys: [
        {
          name: 'User',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      ]

    })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reserves')
  }

}
