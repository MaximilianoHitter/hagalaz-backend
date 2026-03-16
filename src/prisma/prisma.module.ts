import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TRANSACTION_MANAGER } from './transaction-manager';
import { PrismaTransactionManager } from './prisma-transaction-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: TRANSACTION_MANAGER,
      useClass: PrismaTransactionManager
    }
  ],
  exports: [
    PrismaService,
    {
      provide: TRANSACTION_MANAGER,
      useClass: PrismaTransactionManager
    }
  ]
})
export class PrismaModule { }