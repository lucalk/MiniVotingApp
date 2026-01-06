import { Body, Controller, Get, ParseIntPipe, Patch, Post, UseGuards, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    // Créer un utilisateur
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    // Liste des utilisateurs
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Get()
    findAll(){
        return this.userService.findAll()
    }

    // Modifier un utilisateur
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto){
            return this.userService.update(id, updateUserDto)
    }

    // Trouver un utilisateur avec l'id
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Get(':id')
    findOne(@Param("id", ParseIntPipe) id: number,){
        return this.userService.findById(id)
    }

    // Supprimer un utilisateur
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('BOSS')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.userService.remove(id)
    }

    // Récuperer les information d'un utilisateur
    @UseGuards(JwtAuthGuard)
    @Get('profil/:id')
    getUSer(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUser(id)
    }
}