import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token; // ดึงจาก cookies
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'), // ใช้ secret จาก environment variables
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // This payload will be the decrypted token payload you provided when signing the token
    return { email: payload.email, fname: payload.fname };
  }
}
