import { IsNotEmpty } from 'class-validator';
export class RegisterDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'First name is required' })
    first_name: string;

    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string;

    @IsNotEmpty({ message: 'Fingerprint is required' })
    fingerprint_hash: string;

}