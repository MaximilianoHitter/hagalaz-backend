import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly db: PrismaService) { }

    async validateExists(email: string) {
        const exists = await this.db.user.findFirst({
            where: {
                email: email
            }
        })
        if (exists) throw new BadRequestException('User already exists')
        return exists;
    }

    async create(data: any) {
        const user = await this.db.user.create({
            data: {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                password_hash: data.password_hash,
                api_secret_encrypted: data.api_secret_encrypted,
                api_secret_iv: data.api_secret_iv,
                api_secret_auth_tag: data.api_secret_auth_tag,
                last_login_at: new Date(),
                failed_loggin_attempts: 0
            }
        })
        return user;
    }
}
