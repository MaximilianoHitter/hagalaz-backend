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

    async getUser(email: string) {
        const exists = await this.db.user.findFirst({
            where: {
                email: email
            }
        })
        if (!exists) throw new BadRequestException('Invalid credential')
        return exists
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

    async incrementFailAttemps(id_user: string) {
        await this.db.user.update({
            where: {
                id: id_user
            },
            data: {
                failed_loggin_attempts: {
                    increment: 1
                }
            }
        });
    }

    async resetFailAttempts(id_user: string) {
        await this.db.user.update({
            where: {
                id: id_user
            },
            data: {
                failed_loggin_attempts: 0
            }
        });
    }

    async blockUser(id_user: string) {
        await this.db.user.update({
            data: {
                bloqued: true
            },
            where: {
                id: id_user
            }
        })
    }
}
