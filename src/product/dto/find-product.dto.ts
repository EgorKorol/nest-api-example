import { IsString, IsNumber, Min } from 'class-validator';

export class FindProductDTO {
  @IsString()
  category: string;

  @IsNumber()
  @Min(1)
  limit: number;
}
