import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './files.service';
import * as fs from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    try {
      // Buscar la información de la imagen en la base de datos por su ID
      const image = await this.fileService.findById(id);
        console.log(image);
      // Verificar si se encontró la imagen
      if (!image) {
        return res.status(404).json({ message: 'Imagen no encontrada' });
      }

      const filePath = image.filePath;
      console.log(filePath);
    // Verificar si el archivo existe en la ubicación especificada
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Imagen no encontrada' });
      }
      // Devolver la imagen como respuesta HTTP
      res.setHeader('Content-Type', image.mimeType);
      console.log(filePath);
      fs.createReadStream(filePath).pipe(res);



    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener la imagen' });
    }
  }
}