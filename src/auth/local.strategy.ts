import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'yourSecretKey', // No se necesita una clave secreta aquí
        });
      }
    
      async validate(payload: any) {
        const user = await this.usersService.findByUsername(payload.username);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}