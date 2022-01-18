import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AUTH_ERRORS } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDTO) {
    const existedUser = await this.authService.findUser(dto.login);

    if (existedUser) {
      throw new BadRequestException(AUTH_ERRORS.ALREADY_REGISTERED);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDTO) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email);
  }
}
