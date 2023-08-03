// files/image.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '../../interfaces/file.interface';

@Injectable()
export class FileService {
    constructor(@InjectModel('File') private fileModel: Model<File>) {}

    async create(file: File): Promise<File> {
      const createdFile = new this.fileModel(file);
      return createdFile.save();
    }
  
    async findById(fileId: string): Promise<File> {
      return this.fileModel.findById(fileId).exec();
    }
  
    async findAll(): Promise<File[]> {
      return this.fileModel.find().exec();
    }
  }