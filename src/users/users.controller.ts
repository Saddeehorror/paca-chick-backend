import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.usersService.createUser(username, password);
    return user;
  }
}