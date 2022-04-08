import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateRoleDto } from 'src/roles/dto/CreateRole.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async sigin(userDto: CreateUserDto) {
    const candidate = await this.usersService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'This Email had been using',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 6);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({
        message: 'Email or password not available',
      });
    }
  }
}
