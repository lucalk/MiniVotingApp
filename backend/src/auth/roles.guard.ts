import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    // Lire les métadonnées (@Roles('admin'))
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        // Récupère les roles requis pour la route
        const requiredRoles = this.reflector.getAllAndOverride(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        )

        if(!requiredRoles){
            // Route non restreinte
            return true
        }

        // Vérifie le role de l'utilisateur
        const {user} = context.switchToHttp().getRequest()
        return requiredRoles.includes(user.role)
    }
}