import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    phone : string
}