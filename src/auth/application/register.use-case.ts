import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { RegisterDto } from "../dto/request/register.dto";
import { UserService } from "src/user/user.service";
import { CryptService } from "src/crypt/crypt.service";
import { ConfigService } from "@nestjs/config";
import { SymmetricService } from "src/crypt/symmetric.service";
import { SessionService } from "../session.service";

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly cryptService: CryptService,
        private readonly configService: ConfigService,
        private readonly symmetricService: SymmetricService,
        private readonly sessionService: SessionService
    ) { }

    async execute(
        data: RegisterDto,
        timestamp: number,
        nonce: string,
        ip: string,
        user_agent: string
    ) {
        await this.authService.validateTimestamp(timestamp);
        await this.authService.validateNonce(nonce);
        await this.userService.validateExists(data.email);
        //Hash password
        const password_hash = await this.cryptService.createPasswordHash(data.password);
        //Create api secret
        const api_secret = await this.cryptService.createApiSecret(32);
        //Cipher api secret
        const master_secret = await this.configService.get<string>('BACKEND_MASTER_KEY');
        if (!master_secret) throw new BadRequestException('Secret didnt found');
        const master_secret_buffer = Buffer.from(master_secret, 'hex');
        const iv = await this.cryptService.createApiSecret(12);
        const { encrypted, tag } = await this.symmetricService.cipher(api_secret, iv, master_secret_buffer);
        //Create user
        const user = await this.userService.create({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password_hash: password_hash,
            api_secret_encrypted: encrypted.toString('hex'),
            api_secret_iv: iv.toString('hex'),
            api_secret_auth_tag: tag.toString('hex')
        });
        //Create session
        const session_token = (await this.cryptService.createApiSecret(32)).toString('hex');
        const token_hash = await this.cryptService.getHash(session_token);
        const session = await this.sessionService.create({
            id_user: user.id,
            fingerprint_hash: data.fingerprint_hash,
            token_hash: token_hash,
            login_ip: ip,
            user_agent: user_agent,
        });
        //Create request_nonce
        const req_nonce = await this.authService.createNonce(
            nonce,
            user.id,
            Number(timestamp)
        );
        //Create jwt token
        const token = await this.authService.getToken({
            id_user: user.id,
            email: user.email,
            id_session: session.id
        });
        return {
            user, token
        }


    }
}