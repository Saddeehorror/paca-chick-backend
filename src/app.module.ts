import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './modules/inventory/inventory.module'; // Importamos el módulo de inventario
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ // Configura ServeStaticModule
      rootPath: join(__dirname, '..', 'uploads'), // Utiliza la carpeta "uploads" en el directorio raíz del proyecto
    }),
    // Configuración de variables de entorno (opcional)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables sean globales en toda la aplicación
    }),
    // Configuración de la conexión a MongoDB
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
    MulterModule.register({
      dest: './uploads', // Directorio donde se guardarán las imágenes subidas
    }),


    // Importamos el módulo de inventario
    InventoryModule,
    FilesModule,
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
