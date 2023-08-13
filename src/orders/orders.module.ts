import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Inventory, InventorySchema } from 'src/models/inventory.model';
import { InventoryModule } from 'src/modules/inventory/inventory.module';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { SizesModule } from 'src/sizes/sizes.module';
import { Size, SizeSchema } from 'src/sizes/entities/size.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,InventoryModule,SizesModule],
  imports: [
    InventoryModule,
    SizesModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
    MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),

   ]
})
export class OrdersModule {}
