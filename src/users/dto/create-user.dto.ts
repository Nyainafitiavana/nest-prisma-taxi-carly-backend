import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Users_roles } from '../../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public nom: string;

  @IsString()
  @IsNotEmpty()
  public prenom: string;

  @IsString()
  @IsNotEmpty()
  public telephone: string;

  @IsString()
  @IsNotEmpty()
  public addressePersonnelle: string;

  @IsString()
  @IsOptional()
  public addresseProfessionnelle: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public roles: Users_roles;
}
