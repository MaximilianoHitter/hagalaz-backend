import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import * as openpgp from 'openpgp';

@Injectable()
export class AsymmetricService {
    constructor(public configService: ConfigService) { }

    //Generate pgp key pair for user
    async generatePgpKeyPair(userEmail: string) {
        const { publicKey, privateKey } = await openpgp.generateKey({
            type: 'rsa',
            rsaBits: 4096,
            userIDs: [{ name: userEmail }],
            passphrase: this.configService.get<string>('BACKEND_MASTER_KEY'),
        });

        return {
            publicKey,
            privateKeyEncrypted: privateKey,
        };
    }
}