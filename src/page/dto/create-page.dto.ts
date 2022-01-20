import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopCategory } from '../page.model';

class HHDTO {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class AdvantageDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreatePageDTO {
  @IsEnum(TopCategory)
  firstCategory: TopCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HHDTO)
  hh?: HHDTO;

  @IsArray()
  @ValidateNested()
  @Type(() => AdvantageDTO)
  advantages: AdvantageDTO[];

  @IsString()
  seoText: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  tagsTitle: string;
}
