import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Poll, Option, PollStatus, Vote } from 'generated/prisma/client';
import { CreatePollDto } from './dto/create-poll.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class PollService {
    constructor(private readonly prisma: PrismaService){}

    // Créer un sondage
    async create(createPollDto: CreatePollDto) {
        const {
            title, question, description, status = PollStatus.DRAFT, isActive = false
        } = createPollDto

        const poll = await this.prisma.poll.create({
            data: {
                title, question, description, status, isActive
            }
        })
        return poll
    }

    // Retourne tous les sondages
    async findAll() {
        const polls = await this.prisma.poll.findMany({
            orderBy: { createdAt: 'desc' },
        })

        if(polls.length == 0){
            return { message: "Aucun sondage existant"}
        }
        return polls
    }

    // Retourne tous les sondages avec options
    async findAllWithOptions() {
        const polls = await this.prisma.poll.findMany({
            orderBy: { createdAt: 'desc' },
            include: { options: true }
        })

        if(polls.length == 0){
            return { message: "Aucun sondage existant"}
        }
        return polls
    }

    // Retourne un sondage
    async findOne(id: number) {
        const poll = await this.prisma.poll.findUnique({
            where: { id },
            include: { options: true }
        })

        if(!poll){
            throw new BadRequestException("Sondage introuvable")
        }
        return poll
    }

    // Retourne tous les votes
    async findVotes(){
        return await this.prisma.vote.findMany({
            select: {
                id: true,
                optionId: true,
                pollId: true,
                userId: true
            }
        })
    }

    // Maj un sondage
    async update(id: number, updatePollDto: UpdatePollDto) {
        await this.ensurePollExists(id)

        try{
            const poll = await this.prisma.poll.update({
                where: { id },
                data: {
                    ...updatePollDto
                }   
            })
            return poll
        }catch(error:any){
            if(error.code){
                // Erreur prisma
                console.error("Erreur Prisma : ", {
                    code: error.code,
                    message: error.message,
                    meta: error.meta
                })
            }else{
                // Erreur générique js
                console.error("Erreur maj sondage : ", error)
            }
            throw error
        }
    }

    // Supprimer un sondage
    async remove(id: number) {
        await this.ensurePollExists(id)

        await this.prisma.vote.deleteMany({
            where: { pollId: id }
        })

        await this.prisma.option.deleteMany({
            where: { pollId: id }
        })

        await this.prisma.poll.delete({
            where: { id }
        })

        return { message: "Sondage supprimé avec succès" }
    }

    // Ajouter une option
    async addOption(pollId: number, createOptionDto: CreateOptionDto) {
        await this.ensurePollExists(pollId)

        const option = await this.prisma.option.create({
            data: {
                label: createOptionDto.label,
                pollId
            }
        })
        return option
    }

    // Maj une option
    async updateOption(optionId: number, updateOptionDto: UpdateOptionDto) {
        await this.ensureOptionExists(optionId)

        const option = await this.prisma.option.update({
            where: { id: optionId },
            data: {
                ...updateOptionDto
            }
        })
        return option
    }

    // Supprimer une option
    async removeOption(optionId: number) {
        await this.ensureOptionExists(optionId)

        await this.prisma.option.delete({
            where: { id: optionId }
        })
        return { message: "Option supprimée avec succès" }
    }

    // Vote pour une option
    async vote(optionId: number, userId: number): Promise<{ question: string; options: Option[]} > {
        const option = await this.prisma.option.findUnique({
            where: { id: optionId },
            include: { poll: true }
        })

        if(!option){
            throw new BadRequestException("Option de vote introuvable")
        }

        // Règle métier : vote seulement sur les sondages publiés et actifs
        if(
            option.poll.status !== PollStatus.PUBLISHED ||
            option.poll.isActive === false ||
            option.isActive == false
        ){
            throw new BadRequestException("Ce sondage n'est pas ouvert aux votes (non publiée ou inactif)")
        }

        const voteExisting = await this.prisma.vote.findUnique({
            where: { userId_pollId: { userId, pollId: option.pollId } }
        })

        if(voteExisting){
            throw new BadRequestException("Vous avez déjà voté dans ce sondage")
        }

        await this.prisma.vote.create({
            data: {
                userId,
                pollId: option.pollId,
                optionId: option.id
            }
        })

        await this.prisma.option.update({
            where: { id: optionId },
            data: {
                votes: { increment: 1 }
            }
        }) 

        const pollWithOptions = await this.prisma.poll.findUnique({
            where: { id: option.pollId },
            include: { options: true }
        })

        return {
            question: pollWithOptions!.question,
            options: pollWithOptions!.options
        }

    }

    // Vérifie qu'un sondage existe
    private async ensurePollExists(id: number){
        const poll = await this.prisma.poll.findUnique({
            where: { id }
        })
        if(!poll){
            throw new NotFoundException("Sondage introuvable")
        }
        return poll
    }

    // Vérfie qu'une option existe
    private async ensureOptionExists(id: number){
        const option = await this.prisma.option.findUnique({
            where: { id }
        })
        if(!option){
            throw new NotFoundException("Option introuvable")
        }
        return option
    }
}