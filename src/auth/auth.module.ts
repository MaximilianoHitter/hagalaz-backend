import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  imports: [CryptModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
