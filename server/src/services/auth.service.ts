import * as bcrypt from 'bcryptjs';
import { User } from 'src/models/user.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  // Create new user
  async createUser(RegisterDto: RegisterDto): Promise<User> {
    const { email, password, firstName, lastName } = RegisterDto;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
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

    return newUser;
  }
}
