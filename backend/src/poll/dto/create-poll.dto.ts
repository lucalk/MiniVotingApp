import { IsString, IsBoolean, IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { PollStatus } from "generated/prisma/enums";

export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    question: string

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description?: string

    @IsEnum(PollStatus)
    @IsOptional()
    status?: PollStatus

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}