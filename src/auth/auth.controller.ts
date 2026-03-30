import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { RegisterDto } from './dto/request/register.dto';
import { RegisterUseCase } from './application/register.use-case';
import { LoginDto } from './dto/request/login.dto';
import { LoginUseCase } from './application/login.use-case';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) { }

    @Post('register')
    async register(
        @Body() data: RegisterDto,
        @Headers('X-Timestamp') timestamp: number,
        @Headers('X-Nonce') nonce: string,
        @Headers('X-Forwarded-for') ip: string,
        @Headers('user-agent') user_agent: string,
        @Res({ passthrough: true }) res: any
    ) {
        const { user, token, token_hash } = await this.registerUseCase.execute(data, timestamp, nonce, ip, user_agent);
        res.cookie('session_token', token_hash, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000 // 5 min
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        });
        return {
            user, token
        };
    }

    @Post('login')
    async login(
        @Body() data: LoginDto,
        @Headers('X-Timestamp') timestamp: number,
        @Headers('X-Nonce') nonce: string,
        @Headers('X-Forwarded-for') ip: string,
        @Headers('user-agent') user_agent: string,
        @Res({ passthrough: true }) res: any
    ) {
        const { user, token, token_hash } = await this.loginUseCase.execute(data, timestamp, nonce, ip, user_agent)
        res.cookie('session_token', token_hash, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000 // 5 min
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        });
        return {
            user, token
        }
    }
}
