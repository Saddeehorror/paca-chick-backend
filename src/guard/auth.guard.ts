import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  canActivate(context: ExecutionContext):  any {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}