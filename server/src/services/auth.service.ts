import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/models/user.model';
import { RegisterDto } from 'src/dto/register.dto';
import { TokensDto } from 'src/dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  // Register new user
  async register(registerDto: RegisterDto): Promise<TokensDto> {
    const { email, password, firstName, lastName } = registerDto;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // number of rounds

    // Create the user
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generate JWT tokens
    const accessToken = this.jwtService.sign({ id: newUser.id });
    const refreshToken = this.jwtService.sign(
      { id: newUser.id },
      { expiresIn: '7d' },
    );

    // Hash the refreshtoken
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // Save the refreshtoken
    await newUser.update({ refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  // Login user
  async login(loginDto: LoginDto): Promise<TokensDto> {
    const { email, password } = loginDto;

    // Check if all required fields are provided
    if (!email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if the user exists
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT tokens
    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

    // Hash the refreshtoken
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Save the refreshtoken
    await user.update({ refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  // Refresh tokens
  async refresh(authorization: string): Promise<TokensDto> {
    // Check if the authorization header is provided
    if (!authorization) {
      throw new UnauthorizedException('No authorization header found');
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token ');
    }

    // Verify the token
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Check if the user exists
    // Find by primary key
    const user = await this.userModel.findByPk(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if the refreshtoken is the same
    const isRefreshTokenCorrect = await bcrypt.compare(
      token,
      user.refreshToken,
    );
    if (!isRefreshTokenCorrect) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Generate new JWT tokens
    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '30d' },
    );

    // Hash the refreshtoken
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Save the refreshtoken
    await user.update({ refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken };
  }
}
