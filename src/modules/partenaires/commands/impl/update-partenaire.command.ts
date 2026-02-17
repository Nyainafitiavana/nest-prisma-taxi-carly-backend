import { UpdatePartenaireDto } from '../../dto/update-partenaire.dto';

export class UpdatePartenaireCommand {
  constructor(
    public readonly id: number,
    public readonly updatePartenaireDto: UpdatePartenaireDto,
  ) {}
}
