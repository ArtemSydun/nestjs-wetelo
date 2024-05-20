import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ConflictException,
  Request,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import { User } from '../users/user.model';
import { Public } from '../../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.authService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.authService.create(createUserDto);

    return user;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
