import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '../../../../utils/constant';
import { DeleteUserCommand } from '../impl/delete-user.command';
import { GetUserQuery } from '../../queries/impl/get-user.queries';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<ExecuteResponse> {
    //Find if task exist
    await this.queryBus.execute(new GetUserQuery(command.id));

    await this.prisma.users.delete({
      where: { id: command.id },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
