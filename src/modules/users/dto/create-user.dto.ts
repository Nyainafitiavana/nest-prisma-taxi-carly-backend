import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Users_roles } from '../../../../generated/prisma/enums';
import { ValidationMessages } from '../../../common/validation/validation-messages';

export class CreateUserDto {
  @IsString({ message: ValidationMessages.type('Nom', 'string') })
  @IsNotEmpty({ message: ValidationMessages.required('Nom') })
  public nom: string;

  @IsString({ message: ValidationMessages.type('Prènoms', 'string') })
  @IsNotEmpty({ message: ValidationMessages.required('Prènoms') })
  public prenom: string;

  @IsString({ message: ValidationMessages.type('Téléphone', 'string') })
  @IsNotEmpty({ message: ValidationMessages.required('Téléphone') })
  @MinLength(10, { message: ValidationMessages.minLength('Téléphone', 10) })
  @MaxLength(10, { message: ValidationMessages.maxLength('Téléphone', 10) })
  public telephone: string;

  @IsString({
    message: ValidationMessages.type('Adresse personnelle', 'string'),
  })
  @IsNotEmpty({ message: ValidationMessages.required('Adresse personnelle') })
  public addressePersonnelle: string;

  @IsString({
    message: ValidationMessages.type('Adresse professionnelle', 'string'),
  })
  @IsOptional()
  public addresseProfessionnelle: string;

  @IsEmail(undefined, { message: ValidationMessages.email('Email') })
  @IsNotEmpty({ message: ValidationMessages.required('Email') })
  public email: string;

  @IsString({ message: ValidationMessages.type('Rôle', 'string') })
  @IsNotEmpty({ message: ValidationMessages.required('Rôle') })
  public roles: Users_roles;
}
