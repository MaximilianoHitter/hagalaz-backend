import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { CryptController } from './crypt.controller';
import { SymmetricService } from './symmetric.service';

@Module({
  providers: [CryptService, SymmetricService],
  controllers: [CryptController],
  exports: [CryptService, SymmetricService]
})
export class CryptModule { }
