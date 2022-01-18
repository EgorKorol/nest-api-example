import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { AuthDTO } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { AUTH_ERRORS } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDTO) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.NOT_FOUND);
    }

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(AUTH_ERRORS.WRONG_PASSWORD);
    }

    return { email: user.email };
  }

  async login(email: string) {
    return {
      accessToken: await this.jwtService.signAsync({ email }),
    };
  }
}
