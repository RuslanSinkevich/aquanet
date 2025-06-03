import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from '../models/material.model';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
  ) {}

  async findAll() {
    return this.materialModel.findAll();
  }

  async findOne(id: number) {
    return this.materialModel.findByPk(id);
  }

  async create(data: any) {
    return this.materialModel.create(data);
  }

  async update(id: number, data: any) {
    const material = await this.materialModel.findByPk(id);
    if (material) {
      return material.update(data);
    }
    return null;
  }

  async remove(id: number) {
    const material = await this.materialModel.findByPk(id);
    if (material) {
      await material.destroy();
      return true;
    }
    return false;
  }
} 