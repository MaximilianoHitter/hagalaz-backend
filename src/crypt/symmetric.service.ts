import { Injectable } from "@nestjs/common";
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

@Injectable()

export class SymmetricService {

    //Generate random AESkey
    generateAesKey() {
        return randomBytes(32); // 256 bits
    }

    //Encrypt with AESkey
    encryptWithAes(plainText: string, aesKey: Buffer) {
        const iv = randomBytes(12); // recomendado para GCM
        const cipher = createCipheriv('aes-256-gcm', aesKey, iv);

        const encrypted = Buffer.concat([
            cipher.update(plainText, 'utf8'),
            cipher.final(),
        ]);

        const authTag = cipher.getAuthTag();

        return {
            encryptedValue: encrypted.toString('base64'),
            iv: iv.toString('base64'),
            authTag: authTag.toString('base64'),
        };
    }

    //Decrypt with AESkey
    decryptWithAes(
        encryptedValue: string,
        aesKey: Buffer,
        iv: string,
        authTag: string,
    ) {
        const decipher = createDecipheriv(
            'aes-256-gcm',
            aesKey,
            Buffer.from(iv, 'base64'),
        );

        decipher.setAuthTag(Buffer.from(authTag, 'base64'));

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedValue, 'base64')),
            decipher.final(),
        ]);

        return decrypted.toString('utf8');
    }
}