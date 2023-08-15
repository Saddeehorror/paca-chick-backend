// inventory.controller.ts

import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, Res, Delete, Put, Query,UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from '../../models/inventory.model';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs-extra'; // Importamos fs-extra para manejo de archivos
import { MulterFile } from '../../interfaces/multer-file.interface'; // Importamos la interfaz MulterFile
import { FileService } from '../files/files.service';
import { Size } from 'src/sizes/entities/size.entity';
import { Types } from 'mongoose';
import { InventorySpecification } from './inventory.specification';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    // private readonly fileService: FileService
    ){}

    @Post('upload/:sizeId')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: MulterFile,@Param('sizeId') sizeId: Size) {

      try {
        // Lógica para guardar el archivo y actualizar el campo idImagen en el modelo de inventario
        const createProduct = await this.inventoryService.createProduct(file,sizeId);
        return { message: 'Imagen subida y registrada correctamente', inventory: createProduct };
      } catch (error) {
        return { message: 'Error al subir la imagen', error: error.message };
      }
    }


  @Post()
  async createInventory(@Body() inventoryData: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryService.createInventory(inventoryData);
  }

  @Get()
  async findAllInventory(): Promise<Inventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get('control')
  async getInventoryInactiveFull(@Query() spec: InventorySpecification): Promise<Inventory[]> {
    return this.inventoryService.getInventoryFull(spec);
  }

  @Get('news')
  async getInventoryNewFull(): Promise<Inventory[]> {
    return this.inventoryService.getInventoryNewFull();
  }

  @Post('activate')
  @UseGuards(AuthGuard)
  async activate(@Body() body: {id:string,active:boolean}): Promise<Inventory> {
    return this.inventoryService.activate(body);
  }

  @Put()
  update(@Body() body:{id:string,price:number,description:string}) {
    return this.inventoryService.update(body);
  }


  @Get('uploads/:filename')
  async getImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Get('full')
  async getAllInventory(): Promise<Inventory[]> {
    const inventory = await this.inventoryService.getAllInventory();
    return inventory;
  }

  @Get('size/:id')
  async getInventoryBySize(@Param('id') id: string) {
    const objectIdParentId = new Types.ObjectId(id); // Convertir el string a ObjectId
    const inventory = await this.inventoryService.getInventoryBySize(objectIdParentId);
    return inventory;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }


  // Puedes agregar más rutas y métodos de controlador según tus necesidades
}
