import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { UserStatus, UserRoles } from '@users/user.interface';
const USER_STATUS: string[] = [...Object.values(UserStatus)] as string[];
const USER_ROLES: string[] = [...Object.values(UserRoles)] as string[];

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: USER_STATUS, default: UserStatus.ACTIVE })
  status: string;

  @Prop({ type: String, enum: USER_ROLES, default: UserRoles.MANAGER })
  role: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export interface UserModel extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  status: UserStatus;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}
