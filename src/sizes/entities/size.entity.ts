
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Size extends Document{
    @Prop()
    name: string;
    @Prop({default:'fa-solid fa-folder'})
    icon: string;
    @Prop({ type: Types.ObjectId, ref: 'parent', default:null})
    parentId: Types.ObjectId;
    @Prop({default:false})
    deleted: boolean;
}


export const SizeSchema = SchemaFactory.createForClass(Size);