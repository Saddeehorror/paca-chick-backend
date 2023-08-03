import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory, InventorySchema } from '../../models/inventory.model';
import { FilesModule } from '../files/files.module';
import { File,FileSchema } from 'src/models/file.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]), // Incluye el modelo File en el contexto del módulo
    FilesModule, // Incluye el módulo FilesModule en el módulo InventoryModule

  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}