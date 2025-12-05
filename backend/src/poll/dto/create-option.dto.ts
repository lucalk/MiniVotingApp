import { MaxLength, IsString, IsNotEmpty } from "class-validator";

export class CreateOptionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    label: string
}