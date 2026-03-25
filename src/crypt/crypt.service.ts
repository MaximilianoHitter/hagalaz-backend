import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';

@Injectable()
export class CryptService {


    //Generate hash with bcrypt
    async generateHashBcrypt(token: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(token, salt);
    }

    //Generate hash with argon2
    async generateHashArgon(token: string): Promise<string> {
        return await argon2.hash(token);
    }
}
