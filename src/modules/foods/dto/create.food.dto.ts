import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {

  @IsString()
  @IsNotEmpty()
  food_name: string;

  @IsOptional()
  @IsString()
  food_img: string;
}
