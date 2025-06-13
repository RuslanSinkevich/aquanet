import { IsString, IsOptional } from 'class-validator';

export type ICreateClientDto = Record<string, any> & {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

export class CreateClientDto implements ICreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}

export type IUpdateClientDto = Partial<ICreateClientDto>; 