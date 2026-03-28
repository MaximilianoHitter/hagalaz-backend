import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async validateTimestamp(timestamp: number) {
        const now = Date.now();
        const diff = Math.abs(now - Number(timestamp));
        if (diff > 5 * 60 * 1000) {
            throw new BadRequestException('Request expired');
        }
    }

    async validateNonce(nonce: string) {
        const exists = await this.db.requestnonces.findFirst({
            where: {
                nonce: nonce
            }
        });
        if (exists) throw new BadRequestException('Reply attack');
    }

    async createNonce(nonce: string, id_user: string, timestamp: number) {
        const request_nonce = await this.db.requestnonces.create({
            data: {
                nonce: nonce,
                id_user: id_user,
                created_at: new Date(),
                timestamp: new Date(timestamp)
            }
        })
        return request_nonce;
    }

    async getToken(data: any) {
        const payload = {
            id_user: data.id_user,
            email: data.email,
            id_session: data.id_session
        };
        return this.jwt.sign(payload, {
            expiresIn: '5m'
        })
    }
}
