
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document{
    @Prop({ required: true })
    username: string;
  
    @Prop({ required: true })
    password: string;
  
    @Prop({ default: false })
    deleted: boolean;
}


export const UserSchema  = SchemaFactory.createForClass(User);