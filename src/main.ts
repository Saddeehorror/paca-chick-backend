import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Establecer la ubicación de la carpeta "uploads" según el entorno de ejecución
  const isProduction = process.env.NODE_ENV === 'production';
  console.log(isProduction);
  const staticPath = isProduction ? '../uploads' : '../src/uploads';
  app.useStaticAssets(join(__dirname, staticPath));
  app.enableCors();

  await app.listen(process.env.PORT, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);

  

  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();
