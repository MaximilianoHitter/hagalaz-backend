import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { CryptModule } from 'src/crypt/crypt.module';
import { SessionService } from './session.service';
import { RegisterUseCase } from './application/register.use-case';
import { LoginUseCase } from './application/login.use-case';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CryptModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET')
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionService, RegisterUseCase, LoginUseCase]
})
export class AuthModule { }
