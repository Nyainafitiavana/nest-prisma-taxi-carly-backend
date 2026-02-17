import { CreatePartenaireDTO } from '../../dto/create-partenaire.dto';

export class CreatePartenaireCommand {
  constructor(public readonly createPartenaireDTO: CreatePartenaireDTO) {}
}
