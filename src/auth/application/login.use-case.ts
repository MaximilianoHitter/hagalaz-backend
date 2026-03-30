import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/request/login.dto";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { CryptService } from "src/crypt/crypt.service";
import { SessionService } from "../session.service";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly cryptService: CryptService,
        private readonly sessionService: SessionService
    ) { }

    async execute(
        data: LoginDto,
        timestamp: number,
        nonce: string,
        ip: string,
        user_agent: string
    ) {
        await this.authService.validateTimestamp(timestamp);
        await this.authService.validateNonce(nonce);
        const user = await this.userService.getUser(data.email);
        if (user.failed_loggin_attempts >= 3) {
            //Block user
            await this.userService.blockUser(user.id);
            throw new BadRequestException('User blocked, too many fail attempts');
        }
        const valid_password = await this.cryptService.validatePassword(data.password, user.password_hash);
        if (!valid_password) {
            //Increment fail attempts
            await this.userService.incrementFailAttemps(user.id);
            throw new BadRequestException('Invalid credentials')
        }
        //Reset fail attempts
        await this.userService.resetFailAttempts(user.id);
        //Revoke old sessions
        await this.sessionService.revokePrevoiusSesions(user.id);
        //Create new session
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
            user, token, token_hash
        }

    }
}