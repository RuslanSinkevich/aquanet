import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // берём токен из заголовка Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey',
    });
  }

  async validate(payload: any) {
    // payload - данные, которые были подписаны в токене (например: { phone, sub: userId })
    return { userId: payload.sub, phone: payload.phone };
    // Можно тут получить данные пользователя из БД, если нужно
  }
}
