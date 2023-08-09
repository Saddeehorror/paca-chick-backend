// inventory.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from './file.model'; // Importa el modelo File si aún no lo has hecho
import { Size } from 'src/sizes/entities/size.entity';

@Schema()
export class Inventory extends Document {

  @Prop({ type: Types.ObjectId, ref: 'File' })
  idImagen: File; // Agregamos el campo idImagen para almacenar el nombre de la imagen

  @Prop({default:'NA'})
  sku: string;

  @Prop({default:0})
  precio: number;

  @Prop()
  descripcion: string;

  @Prop({default:false})
  active: boolean;

  @Prop({default:false})
  aside: boolean;

  @Prop({default:false})
  deleted: boolean;

  @Prop({ default: Date.now })
  fechaCreacion: Date;

  @Prop({ type: Types.ObjectId, ref: 'Size' })
  sizeId: Types.ObjectId;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);