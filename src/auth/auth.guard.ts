import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { API_TOKEN_RECORDING } from './token.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    //Token not provided
    if (!token) {
      throw new UnauthorizedException('Token not provided.');
    }
    //Find record token from database
    const tokenRecord: API_TOKEN_RECORDING | null =
      await this.prisma.api_tokens.findFirst({
        where: {
          token: token,
        },
      });
    //unexist token
    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid token');
    }
    //return error unauthorized when the token is already expired
    if (new Date() > tokenRecord.expires_at) {
      //Delete expired token
      await this.prisma.api_tokens.delete({
        where: { id: tokenRecord.id },
      });

      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
