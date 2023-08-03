import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '../../models/file.model'; // Importa el modelo File y su esquema
import { FileService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]), // Incluye el modelo File en el contexto del módulo
  ],
  providers: [FileService], // Incluye el servicio FileService en el contexto del módulo
  exports: [FileService], // Exporta el servicio FileService para que esté disponible en otros módulos que importen este módulo
  controllers: [FilesController],

})
export class FilesModule {}