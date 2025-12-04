import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createUserDto {

    @IsOptional()
    @IsNumber()
    id: number
    
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    phone : string
}