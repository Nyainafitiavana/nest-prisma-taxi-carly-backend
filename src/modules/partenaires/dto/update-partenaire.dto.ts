import { PartialType } from '@nestjs/mapped-types';
import { CreatePartenaireDTO } from './create-partenaire.dto';

export class UpdatePartenaireDto extends PartialType(CreatePartenaireDTO) {}
