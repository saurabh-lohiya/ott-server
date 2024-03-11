import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('google-login')
  async googleLogin(@Body('token') token: string): Promise<User> {
    return this.usersService.googleLogin(token);
  }

  @Post('new')
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Res() res,
    @Param('id') username: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(res, username, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
