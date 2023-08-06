import { Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.username, req.body.password);
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    return this.authService.login(user);
  }
}