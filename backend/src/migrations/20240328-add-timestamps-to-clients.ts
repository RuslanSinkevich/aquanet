import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('clients', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });

  await queryInterface.addColumn('clients', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('clients', 'created_at');
  await queryInterface.removeColumn('clients', 'updated_at');
} 