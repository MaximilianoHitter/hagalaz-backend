import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()

export class SymmetricService {

    async cipher(secret: NonSharedBuffer, iv: NonSharedBuffer, master_key: NonSharedBuffer) {
        const cipher = crypto.createCipheriv('aes-256-gcm', master_key, iv);
        let encrypted = cipher.update(secret);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const tag = cipher.getAuthTag();
        return {
            encrypted,
            tag
        }
    }
}