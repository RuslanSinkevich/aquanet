import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('work_items', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });

  await queryInterface.addColumn('work_items', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('work_items', 'created_at');
  await queryInterface.removeColumn('work_items', 'updated_at');
} 