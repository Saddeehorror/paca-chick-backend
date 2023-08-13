import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { Size, SizeSchema } from './entities/size.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  imports: [
    MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),
   ],
   exports:[
    SizesService
   ]
})
export class SizesModule {}
