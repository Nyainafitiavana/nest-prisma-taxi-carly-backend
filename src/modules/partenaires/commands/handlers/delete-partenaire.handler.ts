import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '../../../../utils/constant';
import { DeletePartenaireCommand } from '../impl/delete-partenaire.command';
import { GetPartenaireByIdQuery } from '../../queries/impl/get-partenaire-by-id.queries';

@CommandHandler(DeletePartenaireCommand)
export class DeletePartenaireHandler implements ICommandHandler<DeletePartenaireCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: DeletePartenaireCommand): Promise<ExecuteResponse> {
    //Find if task exist
    await this.queryBus.execute(new GetPartenaireByIdQuery(command.id));

    await this.prisma.partenaires.delete({
      where: { id: command.id },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
