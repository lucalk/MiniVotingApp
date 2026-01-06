import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    // Vérifie email + password
    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email)
        if(!user) return null

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return null

        return user
    }

    // Retourne un token
    async login(email: string, password: string){
        const user = await this.validateUser(email, password)
        if(!user) throw new UnauthorizedException("Identifiants incorrects")

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const token = this.jwtService.sign(payload)

        return {
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }
    }
}
