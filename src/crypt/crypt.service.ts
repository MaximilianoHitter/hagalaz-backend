import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class CryptService {
    async createPasswordHash(password: string) {
        return await argon.hash(password);
    }

    async validatePassword(password: string, password_hash: string): Promise<boolean> {
        return await argon.verify(password_hash, password);
    }

    async createApiSecret(qty: number) {
        return crypto.randomBytes(qty);
    }

    async getHash(token: string) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}
