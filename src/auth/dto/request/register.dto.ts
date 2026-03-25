import { IsEmail, IsHexadecimal, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email invalid format' })
    email: string;

    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name invalid format' })
    first_name: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'Last name invalid format' })
    last_name: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Fingerprint is required' })
    @IsString({ message: 'Fingerprint invalid format' })
    @IsHexadecimal({ message: 'Fingerprint invalid format' })
    @Length(64, 64, { message: 'Fingerprint invalid format' })
    fingerprint_hash: string;
}