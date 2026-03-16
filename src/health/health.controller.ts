import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller('health')
export class HealthController {
    @Throttle({ default: { limit: 6, ttl: 60000 } })
    @Get()
    getHealth() {
        return { message: 'Ok' }
    }
}
