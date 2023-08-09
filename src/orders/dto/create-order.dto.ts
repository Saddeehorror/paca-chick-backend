import { Types } from "mongoose";

export class CreateOrderDto {
    clientName:string;
    clientNumber:string;
    inventoryIds: Types.ObjectId[];
}
