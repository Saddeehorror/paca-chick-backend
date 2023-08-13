import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('advance')
  updateAdvance(@Body() updateAdvance: {id:string,advance:number}) {
    return this.ordersService.updateAdvance(updateAdvance);
  }

  @Put('status')
  updateStatus(@Body() updateStatus: {id:string,status:number}) {
    return this.ordersService.updateStatus(updateStatus);
  }

  @Get()
  findAll() {
    return this.ordersService.findAllFull();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
