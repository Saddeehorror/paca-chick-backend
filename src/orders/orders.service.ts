import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Inventory } from 'src/models/inventory.model';
import { InventoryService } from 'src/modules/inventory/inventory.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private OrderModel:Model<Order>,
    private inventoryService:InventoryService
  ){}
  async create(createOrderDto: CreateOrderDto) {
    try{

      createOrderDto.inventoryIds.forEach((element,index) => {

        this.inventoryService.aside(element.toString())
        createOrderDto.inventoryIds[index] = new Types.ObjectId(element);
      });

      const number = await this.findAll();


      let order = {
        clientName:createOrderDto.clientName,
        clientNumber:createOrderDto.clientNumber,
        orderNumber:number.length+1,
        inventoryIds: createOrderDto.inventoryIds
      }


      const newOrder = new this.OrderModel(order);
      return await newOrder.save();
    }catch(err){
      throw new Error('Error al guardar la Orden: ' + err.message);
    }
  }





  async findAll() {
    let orders = await this.OrderModel.find();
    return orders
  }

  async findAllFull(){
    let orders = await this.findAll();
    console.log(orders);

    for (let index = 0; index < orders.length; index++) {

      for (let  j = 0; j < orders[index].inventoryIds.length; j++) {
        let inventory = await this.inventoryService.getInventoryByidFull(orders[index].inventoryIds[j])
        orders[index].inventoryIds[j] = <any> inventory
      }
      
    }

    console.log(orders);

    // await orders.forEach(async (element,index) => {




      
    //   await element.inventoryIds.forEach(async (element2,index2) => {
    //     console.log(inventory);
    //     orders[index].inventoryIds[index2] = <any>inventory;
    //     console.log('orders',orders);
    //   });
    // });

    return orders

  }



  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
