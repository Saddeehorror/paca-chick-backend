import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './local.strategy'; // Importa la estrategia local

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registra Passport con la estrategia local como predeterminada
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Agrega LocalStrategy aquí
})
export class AuthModule {}