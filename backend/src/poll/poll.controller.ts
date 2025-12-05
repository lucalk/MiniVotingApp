import { Controller, Body, Get, Post, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { PollService } from './poll.service';
import { VoteDto } from './dto/vote.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';


@Controller('polls')
export class PollController {
    constructor(private readonly pollService: PollService){}

    // Retourne tous les sondages
    @Get()
    findAll(){
        return this.pollService.findAll()
    }

    // Retourne tous les sondages
    @Get('all')
    findAllWithOption(){
        return this.pollService.findAllWithOptions()
    }

    // Retourne un sondage 
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number){
        return this.pollService.findOne(id)
    }

    // Créer un sondage
    @Post()
    create(@Body() createPollDto: CreatePollDto){
        return this.pollService.create(createPollDto)
    }

    // Maj d'un sondage
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updatePollDto: UpdatePollDto){
        return this.pollService.update(id, updatePollDto)
    }

    // Supprimer un sondage
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number){
        return this.pollService.remove(id)
    }

    // Ajouter une option
    @Post(":id/options")
    addOption(
        @Param("id", ParseIntPipe) pollId: number,
        @Body() createOptionDto: CreateOptionDto
    ){
        return this.pollService.addOption(pollId, createOptionDto)
    }

    // Maj d'une option 
    @Patch("options/:optionId")
    updateOption(
        @Param("optionId", ParseIntPipe) optionId: number,
        @Body() updateOptionDto: UpdateOptionDto
    ){
        return this.pollService.updateOption(optionId, updateOptionDto)
    }

    // Suppression d'une option
    @Delete("options/:optionId")
    deleteOption(@Param("optionId", ParseIntPipe) optionId: number){
        return this.pollService.removeOption(optionId)
    }

    // Voter 
    @Post("vote")
    async vote(@Body() voteDto: VoteDto){
        return this.pollService.vote(voteDto.optionId)
    }
}
