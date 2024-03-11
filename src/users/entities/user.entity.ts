import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// How to make a field required

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email!: string;

  @Prop()
  password!: string;

  @Prop({
    default: 'member',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
