import { PartialType } from '@nestjs/mapped-types';
import { CreateTarifDto } from './create-tarif.dto';

export class UpdateTarifDto extends PartialType(CreateTarifDto) {}
