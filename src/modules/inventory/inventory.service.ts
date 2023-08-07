// inventory.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../../models/inventory.model';
import * as fs from 'fs-extra'; // Importamos fs-extra para manejo de archivos
import { MulterFile } from 'src/interfaces/multer-file.interface';
import { FileService } from '../files/files.service';
import { Types } from 'mongoose'; // Agrega la importación de Types desde Mongoose
import * as sharp from 'sharp'; // Importar sharp


@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    private readonly fileService: FileService

    ) {}

  async createProduct(file: MulterFile,sizeId:any): Promise<Inventory> {
    // Verificar y crear la carpeta de uploads si no existe
    const uploadPath = './uploads';
    if (!(await fs.pathExists(uploadPath))) {
      await fs.mkdir(uploadPath);
    }
    


    // Guardar el archivo en el directorio de uploads
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `${uploadPath}/${fileName}`;

        // Comprimir la imagen usando sharp
        const compressedImageBuffer = await sharp(file.buffer)
        .resize(500) // Redimensionar según tus necesidades
        .toBuffer();

    const fileSaved = await fs.writeFile(filePath, compressedImageBuffer); // Mover el archivo del directorio temporal a uploads

    const image = await this.fileService.create({
      fileName: fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      filePath: 'uploads/'+fileName,
      createdAt: new Date(),
    });
    console.log(image);

    const size  = new Types.ObjectId(sizeId);


    const shortSku = this.generateShortSku(
      image._id.toString(),
      size.toString(),
    );

    const inventory = await this.createInventory({
      descripcion:'',
      idImagen:image._id,
      sizeId:size,
      sku:shortSku
    })

    console.log('xxxx',inventory);


    return inventory;


  }


  async createInventory(inventoryData: Partial<Inventory>): Promise<Inventory> {
    try {
      // Crear una nueva instancia del modelo de inventario
      const newInventory = new this.inventoryModel(inventoryData);

      // Guardar el inventario en la base de datos
      return await newInventory.save();
    } catch (error) {
      throw new Error('Error al guardar el inventario: ' + error.message);
    }
  }

  async findAllInventory(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async updateImage(inventoryId: string, file: MulterFile): Promise<String> {
    console.log('verificando.................');
    // Verificar y crear la carpeta de uploads si no existe
    const uploadPath = './uploads';
    if (!(await fs.pathExists(uploadPath))) {
      console.log('no existe');
      await fs.mkdir(uploadPath);
    }
    console.log('ya existe');


    // Guardar el archivo en el directorio de uploads
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `${uploadPath}/${fileName}`;

    await fs.writeFile(filePath, file.buffer); // Mover el archivo del directorio temporal a uploads
    console.log('filePath',filePath);
    // // Actualizar el campo idImagen en el modelo de inventario
    // const updatedInventory = await this.inventoryModel.findByIdAndUpdate(
    //   inventoryId,
    //   { idImagen: fileName },
    //   { new: true },
    // );
    return filePath;


  }


  async getAllInventory(): Promise<Inventory[]> {
    // Realizar la consulta para obtener el inventario con la información completa del archivo
    let inventory = await this.inventoryModel
      .find()
      .populate('idImagen') // Aquí se especifica el campo que se va a "populate"
      const baseUrl = process.env.BASE_URL_FILE;
      // const baseUrl = 'https://paca-chick-backend-aav9-dev.fl0.io/files/';
    // Combinar la URL base con el campo filePath para obtener la URL completa del archivo

    console.log(inventory);
    await inventory.forEach(item => {
      (item.idImagen?.filePath)?item.idImagen.filePath = baseUrl + item.idImagen._id:''
      
    });

    console.log(inventory);


    return inventory;
  }
  // Puedes agregar más métodos para otras operaciones CRUD, como actualizar y eliminar inventario.

  async getInventoryBySize(sizeId:Types.ObjectId){
    let inventory = await this.inventoryModel.find({ sizeId,deleted:false }).populate('idImagen')
    const baseUrl = process.env.BASE_URL_FILE;
    // const baseUrl = 'https://paca-chick-backend-aav9-dev.fl0.io/files/';
    // Combinar la URL base con el campo filePath para obtener la URL completa del archivo

    console.log(inventory);
    await inventory.forEach(item => {
      (item.idImagen?.filePath)?item.idImagen.filePath = baseUrl + item.idImagen._id:''
      
    });
    return inventory
  }


  async remove(id: string) {
    const idAsObjectId = new Types.ObjectId(id); // Convertir la cadena de texto en ObjectId

    const updatedInventory = await this.inventoryModel.findByIdAndUpdate(
      id,
      { deleted: true }, // Cambiar la propiedad 'deleted' a 'false'
      { new: true }
    );

    if (!updatedInventory) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }

    return updatedInventory;
  }

  generateShortSku(idImagen: string, sizeId: string): string {
    // Obtener las iniciales de idImagen (por ejemplo, las dos primeras letras)
    const imageInitials = idImagen.substr(0, 2).toUpperCase();
  
    // Obtener las últimas dos cifras de sizeId
    const sizeDigits = sizeId.substr(sizeId.length - 2);

      // Generar un número aleatorio de 4 cifras
  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  
    // Combinar las iniciales de idImagen y las últimas dos cifras de sizeId
    const shortSku = `${imageInitials}${sizeDigits}${randomDigits}`;
  
    return shortSku;
  }

}