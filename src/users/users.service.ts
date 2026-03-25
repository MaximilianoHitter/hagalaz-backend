import { Injectable } from '@nestjs/common';
import { Prisma, user } from 'generated/prisma/browser';
import { isPrismaTransaction } from 'src/prisma/prisma-transaction-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionContext } from 'src/prisma/transaction-manager';

@Injectable()
export class UsersService {
    constructor(private readonly db: PrismaService) { }

    private getTransactionClient(
        tx: TransactionContext | null,
    ): Prisma.TransactionClient | PrismaService {
        if (tx && isPrismaTransaction(tx)) {
            return tx;
        }
        return this.db;
    }

    async createUser(
        user_data: {
            email: string,
            first_name: string,
            last_name: string,
            password_hash: string,
        },
        security_data: {
            encrypted_private_key: string,
            public_key: string,
            private_key_auth_tag: string,
            private_key_iv: string,
        },
        tx: TransactionContext = this.db
    ): Promise<Partial<user>> {
        const client = this.getTransactionClient(tx);
        const user = await client.user.create({
            data: {
                email: user_data.email,
                first_name: user_data.first_name,
                last_name: user_data.last_name,
                password_hash: user_data.password_hash,
                public_key: security_data.public_key,
                private_key_auth_tag: security_data.private_key_auth_tag,
                private_key_iv: security_data.private_key_iv,
                encrypted_private_key: security_data.encrypted_private_key,
                account_locked_until: null,
                created_at: new Date(),
                failed_loggin_attempts: 0,
                updated_at: new Date()
            }
        });
        return user;
    }
}
