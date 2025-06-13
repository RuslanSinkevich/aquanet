import { IsString, IsOptional, IsEmail } from 'class-validator';

export interface ICreateClientDto {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email?: string;
  address: string;
  comment?: string;
}

export class CreateClientDto implements ICreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  comment?: string;
} 