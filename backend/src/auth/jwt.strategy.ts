import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IUser } from "src/common/interfaces/user.interface";
import { UsersService } from '../users/users.service';

export interface IPayload {
  user: IUser
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // берём токен из заголовка Authorization
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'defaultSecretKey',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // Возвращаем объект пользователя с id и ролью для использования в guards
    return { 
      id: user.id, 
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }
}
