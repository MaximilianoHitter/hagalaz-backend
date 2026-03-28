import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionService {
    constructor(private readonly db: PrismaService) { }

    async create(data: any) {
        const session = await this.db.sessions.create({
            data: {
                id_user: data.id_user,
                fingerprint_hash: data.fingerprint_hash,
                token_hash: data.token_hash,
                login_ip: data.login_ip,
                user_agent: data.user_agent,
                created_at: new Date(),
                last_activity_at: new Date(),
                expires_at: new Date(Date.now() + 5 * 60 * 1000),
                revoked: false,
                revoked_reason: ''
            }
        })
        return session;
    }

    async revokePrevoiusSesions(id_user: string) {

    }
}