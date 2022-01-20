import { IsEnum } from 'class-validator';
import { TopCategory } from '../page.model';

export class FindPageDTO {
  @IsEnum(TopCategory)
  firstCategory: TopCategory;
}
