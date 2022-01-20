import { PageModel, TopCategory } from './page.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePageDTO } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>,
  ) {}

  async create(dto: CreatePageDTO) {
    return this.pageModel.create(dto);
  }

  async findById(id: string) {
    return this.pageModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreatePageDTO) {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByCategory(category: TopCategory) {
    return this.pageModel
      .aggregate([
        { $match: { firstCategory: category } },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' },
            pages: { $push: { alias: '$alias', title: '$title' } },
          },
        },
      ])
      .exec();
  }

  async findByText(text: string) {
    return this.pageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }
}
