import { Body, Controller, Header, Headers, Post } from '@nestjs/common';
import { RegisterDto } from './dto/request/register.dto';
import { RegisterUseCase } from './application/register.use-case';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase
    ) { }

    @Post('register')
    async register(
        @Body() data: RegisterDto,
        @Headers('X-Timestamp') timestamp: number,
        @Headers('X-Nonce') nonce: string,
        @Headers('X-Forwarded-for') ip: string,
        @Headers('user-agent') user_agent: string
    ) {
        const { user, token } = await this.registerUseCase.execute(data, timestamp, nonce, ip, user_agent);
        return {
            user, token
        };
    }
}
