import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { Prisma } from 'generated/prisma/client';
import { TransactionContext, TransactionManager } from './transaction-manager';

@Injectable()
export class PrismaTransactionManager implements TransactionManager {
    constructor(private readonly prisma: PrismaService) { }

    async runInTransaction<T>(
        callback: (context: TransactionContext) => Promise<T>,
    ): Promise<T> {
        return this.prisma.$transaction(async (tx) => {
            return callback(tx as unknown as TransactionContext);
        });
    }
}

export function isPrismaTransaction(
    context: TransactionContext,
): context is Prisma.TransactionClient {
    return true;
}