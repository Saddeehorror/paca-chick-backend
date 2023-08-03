import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size.name) private SizeModel: Model<Size>,

    ) {}
  async create(createSizeDto: CreateSizeDto) {
    try {
      // Crear una nueva instancia del modelo de inventario

      let objectIdParentId = null

      if (createSizeDto.parentId) {
        objectIdParentId= new Types.ObjectId(createSizeDto.parentId); // Convertir el string a ObjectId
      }

      createSizeDto.parentId = objectIdParentId

      const newSize = new this.SizeModel(createSizeDto);

      // Guardar el inventario en la base de datos
      return await newSize.save();
    } catch (error) {
      throw new Error('Error al guardar la Talla: ' + error.message);
    }
  }

  async findAll() {
    let inventory = await this.SizeModel
    .find()

    return inventory
  }

  async findAllParents(){
    let inventory = this.SizeModel.find({ parentId: null }).exec();
    return inventory
  }

  async findAllChild(parentId:Types.ObjectId){
    let inventory = this.SizeModel.find({ parentId }).exec();
    return inventory
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}