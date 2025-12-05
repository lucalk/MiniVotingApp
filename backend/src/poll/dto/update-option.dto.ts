import { IsString, IsBoolean, MaxLength, IsOptional, isBoolean } from "class-validator";

export class UpdateOptionDto {
    @IsString()
    @IsOptional()
    @MaxLength(150)
    label?: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}