import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('connection_points', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });

  await queryInterface.addColumn('connection_points', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('connection_points', 'created_at');
  await queryInterface.removeColumn('connection_points', 'updated_at');
} 