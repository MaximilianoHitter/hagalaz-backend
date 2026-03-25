import { Inject, Injectable } from "@nestjs/common";
import { TRANSACTION_MANAGER } from "src/prisma/transaction-manager";
import { AuthService } from "../auth.service";
import { PrismaTransactionManager } from "src/prisma/prisma-transaction-manager";
import { CryptService } from "src/crypt/crypt.service";
import { SymmetricService } from "src/crypt/symmetric.service";
import { AsymmetricService } from "src/crypt/asymmetric.service";
import { RegisterDto } from "../dto/request/register.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject(TRANSACTION_MANAGER)
        private readonly transactionManager: PrismaTransactionManager,
        private readonly authService: AuthService,
        private readonly cryptService: CryptService,
        private readonly symmetricService: SymmetricService,
        private readonly asymmetricService: AsymmetricService,
        private readonly userService: UsersService
    ) { }

    async execute(
        data: RegisterDto,
        headers: { user_agent: string, ip: string }
    ) {
        const respuesta = await this.transactionManager.runInTransaction(
            async (tx) => {
                //Generar hash de password
                const password_hash = await this.cryptService.generateHashArgon(data.password);
                //Crear juego de claves
                const claves = await this.asymmetricService.generatePgpKeyPair(password_hash);
                //Crear usuario
                /* const user = await this.userService.createUser(
                    {
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        password_hash: password_hash
                    },
                    {
                        encrypted_private_key: claves.privateKeyEncrypted,
                        public_key: claves.publicKey
                    }
                ) */
            }
        );
    }
}