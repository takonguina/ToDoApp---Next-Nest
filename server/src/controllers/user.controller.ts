import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // route register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
