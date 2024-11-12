import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  firstName: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  lastName: string;

  @Column({ allowNull: false, unique: true, validate: { isEmail: true } })
  email: string;

  @Column({ allowNull: false, validate: { notEmpty: true } })
  password: string;

  @Column({ allowNull: true })
  refreshToken: string | null;
}
