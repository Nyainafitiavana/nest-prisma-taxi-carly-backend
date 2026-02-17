import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationMessages } from '../../../common/validation/validation-messages';

export class CreatePartenaireDTO {
  @IsString({ message: ValidationMessages.type('Nom', 'string') })
  @IsNotEmpty({ message: ValidationMessages.required('Nom') })
  public nom: string;

  @IsEmail(undefined, { message: ValidationMessages.email('Email') })
  @IsOptional()
  public email: string;

  @IsString({ message: ValidationMessages.type('Téléphone', 'string') })
  @IsOptional()
  @MinLength(10, { message: ValidationMessages.minLength('Téléphone', 10) })
  @MaxLength(10, { message: ValidationMessages.maxLength('Téléphone', 10) })
  public telephone: string;

  @IsString({
    message: ValidationMessages.type('Adresse professionnelle', 'string'),
  })
  @IsOptional()
  public adresse: string;
}
