// file.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class File extends Document {

    @Prop()
    fileName: string;
  
    @Prop()
    originalName: string;
  
    @Prop()
    mimeType: string;
  
    @Prop()
    filePath: string;
  
    @Prop()
    createdAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);