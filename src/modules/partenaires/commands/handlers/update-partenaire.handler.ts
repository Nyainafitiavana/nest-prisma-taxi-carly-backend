import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { MESSAGE } from '../../../../utils/constant';
import { HttpStatus } from '@nestjs/common';
import { UpdatePartenaireCommand } from '../impl/update-partenaire.command';
import { GetPartenaireByIdQuery } from '../../queries/impl/get-partenaire-by-id.queries';

@CommandHandler(UpdatePartenaireCommand)
export class UpdatePartenaireHandler implements ICommandHandler<UpdatePartenaireCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdatePartenaireCommand): Promise<ExecuteResponse> {
    const { id, updatePartenaireDto } = command;

    //Find if task exist
    await this.queryBus.execute(new GetPartenaireByIdQuery(id));

    await this.prisma.partenaires.update({
      where: { id },
      data: {
        ...updatePartenaireDto,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
