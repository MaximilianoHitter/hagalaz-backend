import { Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(
        data: RegisterDto,
        @Headers('user_agent') user_agent: string,
        @Headers('ip') ip: string
    ) {

    }

    @Post('login')
    async login() {
        return { token: 'asdasd', userName: 'pepe', email: "asd@ads.com" }
    }
}
