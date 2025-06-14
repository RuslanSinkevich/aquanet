import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from '../users/users.service';


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
    // Возвращаем объект пользователя, который будет доступен в req.user
    return { 
      id: user.id, 
      phone: user.phone,  
      firstName: user.firstName,
      lastName: user.lastName,
      houseNumber: user.houseNumber,
      role: user.role,
      isConfirmed: user.isConfirmed,
      banned: user.banned,
    };
  }
}
