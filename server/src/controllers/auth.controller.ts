import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // route register
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.createUser(registerDto);
  }
}
