import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { TokensDto } from 'src/dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // route register
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokensDto> {
    return this.authService.register(registerDto);
  }

  // route login
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  // route refresh
  @Post('refresh')
  async refresh(
    @Headers('authorization') authorization: string,
  ): Promise<TokensDto> {
    return this.authService.refresh(authorization);
  }
}
