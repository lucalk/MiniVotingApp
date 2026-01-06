import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from 'generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (private readonly prisma: PrismaService){}

    // Créer un utilisateur
    async create(createUserDto: CreateUserDto){
        const { username, email, password, role } = createUserDto

        const usernameExisting = await this.prisma.user.findUnique({
            where: { username }
        })

        if(usernameExisting){
            throw new ConflictException("Ce nom d'utilisateur est déjà utilisé")
        }

        const emailExisting = await this.prisma.user.findUnique({
            where: { email }
        })

        if(emailExisting){
            throw new ConflictException("Cet email est déjà utilisé")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: { username, email, password: hashedPassword, role: role ?? "USER" }
        })

        const { password: _, ...safeUser } = user
        return safeUser
    }

    // Trouver un utilisateur grâce au nom d'utilisateur
    async findByUsername(username: string){
        return this.prisma.user.findUnique({
            where: { username }
        })
    }

    // Trouver un utilisateur grâce au mail
    async findByEmail(email: string){
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    // Trouver un utilisateur grâce à l'id
    async findById(id: number){
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    // Retourne tous les utilisateur
    async findAll(){
        return this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            }
        })
    }

    // Modifier un utilisateur
    async update(userId: number, updateUserDto: UpdateUserDto){
        await this.findById(userId) 

        try{
            const user = await this.prisma.user.update({
                where: { id: userId },
                data: { ...updateUserDto }
            })
            return user
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
                console.error("Erreur maj utilisateur : ", error)
                throw new BadRequestException("Erreur lors de la mise à jour de l'utilisateur")
            }
        }
    }

    // Supprimer un utilisateur
    async remove(userId: number){
        await this.findById(userId)

        await this.prisma.user.deleteMany({
            where: { id: userId }
        })

        await this.prisma.vote.deleteMany({
            where: { userId }
        }) 

        return { message: "Utilisateur supprimé avec succès" }
    }

    // Récuperer les informations de l'utilisateur
    async getUser(userId: number){
        await this.findById(userId)

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            }
        })

        const votes = await this.prisma.vote.findMany({
            where: { userId }
        })

        return { user, votes }
    }
}
