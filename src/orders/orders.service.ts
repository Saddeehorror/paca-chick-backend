import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { SizesService } from 'src/sizes/sizes.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private OrderModel:Model<Order>,
    private inventoryService:InventoryService,
    private sizesService:SizesService
  ){}
  async create(createOrderDto: CreateOrderDto) {
    try{

      createOrderDto.inventoryIds.forEach((element,index) => {

        this.inventoryService.aside(element.toString())
        createOrderDto.inventoryIds[index] = new Types.ObjectId(element);
      });

      const number = await this.findAll(null);


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

  async updateAdvance(updateAdvance: {id:string,advance:number}){
    let order = await this.OrderModel.findById(updateAdvance.id);
    let total:number = +order.advance + +updateAdvance.advance;
    console.log('total',total);

    let orderstatus = order.status;

    if (order.status == 3) {
      orderstatus = 4
    }

    let orderUpdate = await this.OrderModel.findByIdAndUpdate(updateAdvance.id,
      {advance:total,status:orderstatus},
      {new:true})

    return orderUpdate;
  }

  

  async updateStatus(updateStatus: {id:string,status:number}){
    let orderUpdate = await this.OrderModel.findByIdAndUpdate(updateStatus.id,
      {status:updateStatus.status},
      {new:true})

    return orderUpdate;
  }





  async findAll(filters) {
    let orders = await this.OrderModel.find(filters);
    return orders
  }

  async findAllFull(){
    let orders = await this.findAll({ deleted: false, status: { $not: { $eq: 5 } } });
    console.log(orders);

    for (let index = 0; index < orders.length; index++) {


      for (let  j = 0; j < orders[index].inventoryIds.length; j++) {
        let inventory = await this.inventoryService.getInventoryByidFull(orders[index].inventoryIds[j])
        let size = await this.sizesService.findOne(inventory.sizeId);

        inventory.sizeId = <any>size[0];

        orders[index].inventoryIds[j] = <any> inventory
      }
      
    }

    console.log(orders);
    return orders

  }



  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    let orderUpdate = await this.OrderModel.findByIdAndUpdate(id,
      {deleted:true},
      {new:true})

    console.log('-------------->',orderUpdate);

    orderUpdate.inventoryIds.forEach(async element => {
      let product =  await this.inventoryService.asideFalse(element.toString())
    });

    return orderUpdate;
}
}