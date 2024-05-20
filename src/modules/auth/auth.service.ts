import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.model';
import { CreateUserDto } from '../users/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    const payload = { email: user.email, sub: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { message: 'successfull login', jwt: accessToken };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
