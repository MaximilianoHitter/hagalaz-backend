import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { CryptController } from './crypt.controller';
import { SymmetricService } from './symmetric.service';
import { AsymmetricService } from './asymmetric.service';

@Module({
  providers: [CryptService, SymmetricService, AsymmetricService],
  controllers: [CryptController]
})
export class CryptModule { }
