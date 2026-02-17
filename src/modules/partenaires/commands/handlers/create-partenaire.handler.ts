import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { MESSAGE } from '../../../../utils/constant';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { CreatePartenaireCommand } from '../impl/create-partenaire.command';
import { GetExistPartenaireQuery } from '../../queries/impl/get-partenaire-by-name.queries';

@CommandHandler(CreatePartenaireCommand)
export class CreatePartenaireHandler implements ICommandHandler<CreatePartenaireCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreatePartenaireCommand): Promise<ExecuteResponse> {
    const { createPartenaireDTO } = command;
    //Find if the partenaire is already exist
    const partenaire: boolean = await this.queryBus.execute(
      new GetExistPartenaireQuery(createPartenaireDTO.nom),
    );

    if (partenaire) {
      throw new NotFoundException(
        `${createPartenaireDTO.nom} ${MESSAGE.EXIST_VALUE}`,
      );
    }

    await this.prisma.partenaires.create({
      data: {
        ...createPartenaireDTO,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
