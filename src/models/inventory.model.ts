// inventory.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from './file.model'; // Importa el modelo File si aún no lo has hecho
import { Size } from 'src/sizes/entities/size.entity';

@Schema()
export class Inventory extends Document {

  @Prop({ type: Types.ObjectId, ref: 'File' })
    idImagen: File; // Agregamos el campo idImagen para almacenar el nombre de la imagen

  @Prop()
  descripcion: string;

  @Prop({default:true})
  active: boolean;

  @Prop({default:false})
  deleted: boolean;

  @Prop({ default: Date.now }) // Agregamos el campo fechaCreacion con valor por defecto Date.now()
  fechaCreacion: Date;

  @Prop({ type: Types.ObjectId, ref: 'Size' })
  sizeId: Types.ObjectId; // Agregamos el campo idImagen para almacenar el nombre de la imagen
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);