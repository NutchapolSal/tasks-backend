import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customer',
  timestamps: false,
})
export class Customer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  idcust: number;

  @Column({
    type: 'TEXT',
  })
  custname: string;

  @Column({
    type: 'TEXT',
  })
  @Column
  sex: string;

  @Column({
    type: 'TEXT',
  })
  @Column
  address: string;

  @Column({
    type: 'TEXT',
  })
  @Column
  tel: string;
}
