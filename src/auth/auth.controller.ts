import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('sigin')
  sigin(@Body() userDto: CreateUserDto) {
    return this.authService.sigin(userDto);
  }
}