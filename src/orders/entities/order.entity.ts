import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document{
    @Prop()
    clientName:string;
    @Prop()
    clientNumber:string;
    @Prop() // Agregar 'unique: true' para garantizar unicidad
    orderNumber:number;
    @Prop({ default: Date.now })
    fechaCreacion: Date;
    @Prop({default:false})
    deleted: boolean;
    @Prop({default:false})
    confirmed: boolean;
    @Prop({default:0})
    advance: number;
    @Prop({default:1})
    status: number;
    @Prop({ type: Types.ObjectId, ref: 'inventory'})
    inventoryIds: Types.ObjectId[];
    @Prop()
    endDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
