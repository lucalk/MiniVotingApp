import { IsInt } from "class-validator";

export class VoteDto{
    @IsInt()
    optionId: number

    @IsInt()
    userId: number
}