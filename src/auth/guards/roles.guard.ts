import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles || roles.length === 0) {
            return true; // If no roles are specified, allow access.
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as { id: number; email: string; role: string } | undefined;

        if (!user || !roles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        return true; // Allow access if the role is valid.
    }
}
