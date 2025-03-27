import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  lastSessionClear: Date;
}
