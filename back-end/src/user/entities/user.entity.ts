import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class Users extends Model {
  toObject(): { [x: string]: any; password: any } {
    throw new Error('Method not implemented.');
  }

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare googleId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare picture: string;

  @BeforeCreate
  static async hashPassword(instance: Users) {
    if(instance.password != ''){
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @BeforeCreate
  static async defultRole(instance: Users) {
    instance.role = 'user';
  }
}
