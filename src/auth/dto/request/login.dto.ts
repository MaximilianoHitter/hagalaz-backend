import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
    @IsNotEmpty({ message: 'Fingerprint is required' })
    fingerprint_hash: string;
}