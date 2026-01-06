import { IsEmail, IsString, isNotEmpty, isEnum, IsNotEmpty, MaxLength, IsEnum, IsOptional, MinLength } from "class-validator";
import { UserRole } from "generated/prisma/enums";

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole
}
