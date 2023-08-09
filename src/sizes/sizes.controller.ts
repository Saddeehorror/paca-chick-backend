import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { Types } from 'mongoose';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @Get('parents')
  findAllParents() {
    return this.sizesService.findAllParents();
  }

  @Get('active')
  findAllActive() {
    return this.sizesService.findAllActive();
  }

  @Get('childs/:id')
  findAllChilds(@Param('id') id: string) {
    const objectIdParentId = new Types.ObjectId(id); // Convertir el string a ObjectId

    return this.sizesService.findAllChild(objectIdParentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const objectIdParentId = new Types.ObjectId(id); // Convertir el string a ObjectId
    return this.sizesService.findOne(objectIdParentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizesService.update(+id, updateSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizesService.remove(id);
  }
}
