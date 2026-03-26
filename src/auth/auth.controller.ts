import { Body, Controller, Header, Headers, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post()
    register(@Body() data: any, @Headers('X-Timestamp') timestamp: number, @Headers('X-Nonce') nonce: string) {

    }
}
