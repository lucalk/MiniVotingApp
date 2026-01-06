import { Controller, Body, Get, Post, Param, ParseIntPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { VoteDto } from './dto/vote.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('polls')
export class PollController {
    constructor(private readonly pollService: PollService){}

    // Retourne tous les sondages
    // 🔵 PUBLIC (lecture)
    @Get()
    findAll(){
        return this.pollService.findAll()
    }

    // Retourne tous les sondages
    // 🔵 PUBLIC (lecture)
    @Get('all')
    findAllWithOption(){
        return this.pollService.findAllWithOptions()
    }

    // Retourne tous les votes
    // 🔵 PUBLIC (lecture)
    @Get("allVotes")
    async findAllVotes(){
        return this.pollService.findVotes()
    }

    // Retourne un sondage 
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number){
        return this.pollService.findOne(id)
    }

    // Créer un sondage
    // 🟥 BOSS ONLY
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('BOSS')
    @Post()
    create(@Body() createPollDto: CreatePollDto){
        return this.pollService.create(createPollDto)
    }

    // Maj d'un sondage
    // 🟥 BOSS ONLY
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updatePollDto: UpdatePollDto){
        return this.pollService.update(id, updatePollDto)
    }

    // Supprimer un sondage
    // 🟥 BOSS ONLY
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('BOSS')
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number){
        return this.pollService.remove(id)
    }

    // Ajouter une option
    // 🟥 BOSS ONLY
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('BOSS')
    @Post(":id/options")
    addOption(
        @Param("id", ParseIntPipe) pollId: number,
        @Body() createOptionDto: CreateOptionDto
    ){
        return this.pollService.addOption(pollId, createOptionDto)
    }

    // Maj d'une option 
    // 🟥 BOSS ONLY
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('BOSS')
    @Patch("options/:optionId")
    updateOption(
        @Param("optionId", ParseIntPipe) optionId: number,
        @Body() updateOptionDto: UpdateOptionDto
    ){
        return this.pollService.updateOption(optionId, updateOptionDto)
    }

    // Suppression d'une option
    // 🟥 BOSS ONLY
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('BOSS')
    @Delete("options/:optionId")
    deleteOption(@Param("optionId", ParseIntPipe) optionId: number){
        return this.pollService.removeOption(optionId)
    }

    // Voter 
    // 🟢 USER (ou public) – voter
    @Post("vote")
    async vote(@Body() voteDto: VoteDto){
        return this.pollService.vote(voteDto.optionId, voteDto.userId)
    }
}
